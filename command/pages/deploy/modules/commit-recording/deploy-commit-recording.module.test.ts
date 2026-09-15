import { expect, test } from "bun:test"
import {
  commitKeptIn,
  commitRecordedIn,
  DEPLOYED_COMMIT,
  REFUSED_COMMIT,
  recordedCommit,
  saidOfNoRecord,
  saidOfNoRefusal,
} from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import {
  ASK_AT,
  type Fetcher,
  type Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const AT = "infrastructure/service/cluster/pages/one/one.service-cluster.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

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

test("the commit put up and the commit refused are kept under two keys", () => {
  expect(DEPLOYED_COMMIT).not.toBe(REFUSED_COMMIT)
})

test("a page the pages answer no row for is read as no commit", async () => {
  const held = answering(null)
  expect(await commitKeptIn(AT, DEPLOYED_COMMIT, held.fetcher, neverNaps)).toBeNull()
})

test("the commit is asked of the pages under the page type and slug the path names", async () => {
  const held = answering(null, 200, [{ slug: "one", [DEPLOYED_COMMIT]: COMMIT }])
  expect(await commitKeptIn(AT, DEPLOYED_COMMIT, held.fetcher, neverNaps)).toBe(COMMIT)
  const asked = JSON.parse(held.asked())
  expect(asked.pageTypeSlug).toBe("service-cluster")
  expect(asked.where.slug.is).toBe("one")
})

test("the commit a deploy recorded is the one kept under the deployed key", async () => {
  const held = answering(null, 200, [{ slug: "one", [DEPLOYED_COMMIT]: COMMIT }])
  expect(await commitRecordedIn(AT, held.fetcher, neverNaps)).toBe(COMMIT)
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

test("the commit is kept by a write handed to the pages rather than by writing the tree", async () => {
  const held = answering({ commit: null, wrote: [AT], took: [] })
  const wrong = await recordedCommit("one", AT, COMMIT, held.fetcher, neverNaps)
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
  expect(await recordedCommit("one", AT, COMMIT, held.fetcher, neverNaps)).toEqual([])
  expect(held.sent()).toBe("")
})

test("a write the pages refuse is answered as what went wrong rather than thrown", async () => {
  const held = answering({ refused: "the pages would not write" }, 400)
  const wrong = await recordedCommit("one", AT, COMMIT, held.fetcher, neverNaps)
  expect(wrong[0]).toContain("the pages would not write")
  expect(wrong[0]).toContain(COMMIT)
})
