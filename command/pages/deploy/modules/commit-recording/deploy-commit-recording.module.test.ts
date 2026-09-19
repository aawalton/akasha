import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  commitKeptIn,
  commitRecordedIn,
  DEPLOY_REFUSAL,
  DEPLOYED_COMMIT,
  type Keeping,
  keepingFor,
  REFUSED_COMMIT,
  recordedCommit,
  recordedRefusal,
  refusalKept,
  saidOfNoRecord,
  saidOfNoRefusal,
} from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import {
  CLUSTER_SERVICE,
  WORKSTATION_SERVICE,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import {
  ASK_AT,
  type Fetcher,
  type Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const SCRATCH = "/var/tmp"

const AT = "infrastructure/service/cluster/pages/one/one.service-cluster.ts"

const BESIDE = "infrastructure/service/workstation/pages/one/one.service-workstation.ts"

const NO_BESIDE = "infrastructure/service/workstation/pages/one/one.service-workstation.md"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const WHY = "a check refused this deploy"

const AUTHORED = /^[^<>]+ <[^<>@\s]+@[^<>\s]+>$/

const neverNaps: Sleeper = () => Promise.resolve()

type Answering = {
  readonly fetcher: Fetcher
  readonly asked: () => string
  readonly sent: () => string
}

function answering(body: unknown, status: number = 200, rows: readonly unknown[] = []): Answering {
  let asked = ""
  let sent = ""
  return {
    fetcher: (url, init) => {
      if (url.endsWith(ASK_AT)) {
        asked = String(init.body)
        return Promise.resolve(new Response(JSON.stringify({ rows, n: rows.length })))
      }
      sent = String(init.body)
      return Promise.resolve(new Response(JSON.stringify(body), { status }))
    },
    asked: () => asked,
    sent: () => sent,
  }
}

const pages = (held: Answering): Keeping => ({ through: held.fetcher, naps: neverNaps })

const ROOTS: string[] = []

function aRoot(): string {
  const root = mkdtempSync(join(SCRATCH, "akasha-deploy-recording-"))
  ROOTS.push(root)
  mkdirSync(join(root, dirname(BESIDE)), { recursive: true })
  return root
}

const uncommittedTimeOf = (root: string): number =>
  statSync(join(root, BESIDE.replace(/\.ts$/, ".uncommitted.ts"))).mtimeMs

afterAll(() => {
  for (const one of ROOTS) rmSync(one, { recursive: true, force: true })
})

test("the commit put up and the commit refused are kept under two keys", () => {
  expect(DEPLOYED_COMMIT).not.toBe(REFUSED_COMMIT)
})

test("a page the pages answer no row for is read as no commit", async () => {
  const held = answering(null)
  expect(await commitKeptIn(AT, DEPLOYED_COMMIT, pages(held))).toBeNull()
})

test("the commit is asked of the pages under the page type and slug the path names", async () => {
  const held = answering(null, 200, [{ slug: "one", [DEPLOYED_COMMIT]: COMMIT }])
  expect(await commitKeptIn(AT, DEPLOYED_COMMIT, pages(held))).toBe(COMMIT)
  const asked = JSON.parse(held.asked())
  expect(asked.pageTypeSlug).toBe("service-cluster")
  expect(asked.where.slug.is).toBe("one")
})

test("the commit a deploy recorded is the one kept under the deployed key", async () => {
  const held = answering(null, 200, [{ slug: "one", [DEPLOYED_COMMIT]: COMMIT }])
  expect(await commitRecordedIn(AT, pages(held))).toBe(COMMIT)
})

test("a workstation service keeps its commit beside its page rather than through the pages", () => {
  expect(keepingFor("/repo", WORKSTATION_SERVICE)).toEqual({ beside: "/repo" })
})

test("every other kind keeps its commit through the pages", () => {
  const held = answering(null)
  expect(keepingFor("/repo", CLUSTER_SERVICE, held.fetcher, neverNaps)).toEqual({
    through: held.fetcher,
    naps: neverNaps,
  })
})

test("a commit kept beside the page is read back from beside that page", async () => {
  const root = aRoot()
  const keeping = keepingFor(root, WORKSTATION_SERVICE)
  expect(await commitRecordedIn(BESIDE, keeping)).toBeNull()

  expect(await recordedCommit("one", BESIDE, COMMIT, keeping)).toEqual([])

  expect(await commitRecordedIn(BESIDE, keeping)).toBe(COMMIT)
})

test("a commit kept beside the page reaches no service", async () => {
  const root = aRoot()
  const held = answering(null)
  const keeping = keepingFor(root, WORKSTATION_SERVICE, held.fetcher, neverNaps)

  expect(await recordedCommit("one", BESIDE, COMMIT, keeping)).toEqual([])

  expect(held.sent()).toBe("")
  expect(held.asked()).toBe("")
})

test("a page already keeping that commit beside it is written to by nothing", async () => {
  const root = aRoot()
  const keeping = keepingFor(root, WORKSTATION_SERVICE)
  expect(await recordedCommit("one", BESIDE, COMMIT, keeping)).toEqual([])
  const was = uncommittedTimeOf(root)

  expect(await recordedCommit("one", BESIDE, COMMIT, keeping)).toEqual([])

  expect(uncommittedTimeOf(root)).toBe(was)
})

test("a write beside the page that threw is answered as what went wrong rather than thrown", async () => {
  const keeping = keepingFor(aRoot(), WORKSTATION_SERVICE)
  const wrong = await recordedCommit("one", NO_BESIDE, COMMIT, keeping)
  expect(wrong.length).toBe(1)
  expect(wrong[0]).toContain(COMMIT)
  expect(wrong[0]).toContain("nothing sits beside it")
})

test("a write that failed is said back with the commit and what went wrong", () => {
  const said = saidOfNoRecord("one", COMMIT, ["the folder was read-only"])
  expect(said).toContain(COMMIT)
  expect(said).toContain("the folder was read-only")
})

test("a refusal that was not kept is said back as a commit that would be tried again", () => {
  const said = saidOfNoRefusal("one", COMMIT, ["the folder was read-only"])
  expect(said).toContain(COMMIT)
  expect(said).toContain("again")
})

test("another kind's commit is kept by a write handed to the pages rather than by writing the tree", async () => {
  const held = answering({ commit: null, wrote: [AT], took: [] })
  const wrong = await recordedCommit("one", AT, COMMIT, pages(held))
  expect(wrong).toEqual([])
  const body = JSON.parse(held.sent())
  expect(body.kept).toEqual([{ path: AT, values: { [DEPLOYED_COMMIT]: COMMIT } }])
  expect(body.writer).toMatch(AUTHORED)
  expect(body.message).toContain(DEPLOYED_COMMIT)
})

test("a page the pages already answer that commit for is written to by nothing", async () => {
  const held = answering({ commit: null, wrote: [AT], took: [] }, 200, [
    { slug: "one", [DEPLOYED_COMMIT]: COMMIT },
  ])
  expect(await recordedCommit("one", AT, COMMIT, pages(held))).toEqual([])
  expect(held.sent()).toBe("")
})

test("a write the pages refuse is answered as what went wrong rather than thrown", async () => {
  const held = answering({ refused: "the pages would not write" }, 400)
  const wrong = await recordedCommit("one", AT, COMMIT, pages(held))
  expect(wrong[0]).toContain("the pages would not write")
  expect(wrong[0]).toContain(COMMIT)
})

test("a deploy that refused keeps what it refused for beside the commit it refused at", async () => {
  const root = aRoot()
  const keeping = keepingFor(root, WORKSTATION_SERVICE)

  expect(await recordedRefusal("one", BESIDE, COMMIT, [WHY], keeping)).toEqual([])

  expect(await commitKeptIn(BESIDE, REFUSED_COMMIT, keeping)).toBe(COMMIT)
  expect(await commitKeptIn(BESIDE, DEPLOY_REFUSAL, keeping)).toBe(WHY)
})

test("every refusal one deploy answered is kept as one text, one refusal to a line", () => {
  expect(refusalKept([WHY, "and so did a second"])).toBe(`${WHY}\nand so did a second`)
})

test("a refusal longer than the length kept is cut, and the cut says how long the whole was", () => {
  const said = refusalKept(["x".repeat(134939)])
  expect(said.length).toBe(4000)
  expect(said).toContain("134939")
  expect(said).toContain("cut here")
})

test("every other kind's refusal is written to the pages under its own key", async () => {
  const held = answering({ commit: null, wrote: [AT], took: [] })

  expect(await recordedRefusal("one", AT, COMMIT, [WHY], pages(held))).toEqual([])

  const body = JSON.parse(held.sent())
  expect(body.kept).toEqual([{ path: AT, values: { [DEPLOY_REFUSAL]: WHY } }])
})
