import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { patchAt, patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import { noImportersFiled } from "@akasha/indexes/testing"
import { CLASH_MARK } from "../body-merging/body-merging.module.code.ts"
import { drafted, heldIn, runningIn } from "../drafting/drafting.module.code.ts"
import { landing } from "../landing/landing.module.code.ts"
import {
  A,
  ADMITS,
  bytes,
  CARRIED,
  PAGE,
  pagesRepo,
  REFUSES,
  repoWith,
  scratch,
} from "../landing/landing.module.test-fixtures.ts"
import { readingIn, recordRead, sameBody } from "../reading/reading.module.code.ts"
import { applied as appliedWith } from "./applying.module.code.ts"

const AGENT = "01a05f00-0000-7000-8000-000000000001"

function applied(...said: Parameters<typeof appliedWith>): ReturnType<typeof appliedWith> {
  const patch = patchIn(said[0], said[1])
  const held = patch === null ? null : { held: heldIn(said[0], patch), running: runningIn(patch) }
  return appliedWith(said[0], said[1], said[2], said[3], said[4], said[5], said[6], held)
}

const MORE = `${A}// drafted\n`

afterAll(() => {
  scratch.sweep()
})

async function indexed(): Promise<string> {
  const root = repoWith({ "seed.txt": "held" })
  await landing(root, CARRIED, "held", ADMITS)
  noImportersFiled(root)
  await landing(root, [{ path: PAGE, body: bytes(A) }], "held", ADMITS)
  return root
}

function drafting(root: string): undefined {
  expect("why" in drafted(root, PAGE, [{ path: PAGE, was: bytes(A), body: bytes(MORE) }])).toBe(
    false
  )
}

function headOid(root: string, path: string): string {
  return gitSaid(root, ["rev-parse", `HEAD:${path}`]).trim()
}

test("a patch applied lands its bodies and takes the patch away", async () => {
  const root = await indexed()
  drafting(root)
  const said = await applied(root, PAGE, AGENT, "applied", ADMITS, null)
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(MORE)
  expect(patchIn(root, PAGE)).toBeNull()
  expect(gitSaid(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/patch"])).toBe("")
})

test("a patch applied answers which of its bodies the formatter moved", async () => {
  const root = await indexed()
  drafting(root)
  const said = await applied(root, PAGE, AGENT, "applied", ADMITS, null)
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  expect(said.formatted).toEqual([])
  expect(said.landed).toEqual([PAGE])
})

test("a body applied is recorded as read by the agent that applied it", async () => {
  const root = await indexed()
  drafting(root)
  expect("refusals" in (await applied(root, PAGE, AGENT, "applied", ADMITS, null))).toBe(false)
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(MORE)
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(headOid(root, PAGE))
})

test("an apply the gate refused leaves the patch where the patch is", async () => {
  const root = pagesRepo()
  drafting(root)
  const said = await applied(root, PAGE, AGENT, "applied", REFUSES, null)
  expect("refusals" in said).toBe(true)
  expect(patchIn(root, PAGE)).not.toBeNull()
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(A)
})

test("no patch kept is nothing to apply", async () => {
  const said = await applied(pagesRepo(), PAGE, AGENT, "applied", ADMITS, null)
  expect("refusals" in said).toBe(true)
})

test("a reading wiped away is recorded again for a path that did not move", async () => {
  const root = pagesRepo()
  drafting(root)
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
  await applied(root, PAGE, AGENT, "applied", REFUSES, null)
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(headOid(root, PAGE))
})

test("a patch carrying a conflict does not apply", async () => {
  const root = pagesRepo()
  const marked = `${A}${CLASH_MARK}\nheld\n`
  expect("why" in drafted(root, PAGE, [{ path: PAGE, was: bytes(A), body: bytes(marked) }])).toBe(
    false
  )
  const said = await applied(root, PAGE, AGENT, "applied", ADMITS, null)
  expect("refusals" in said).toBe(true)
  expect(said).toEqual({
    refusals: [
      `${PAGE} — the patch carries a conflict here`,
      "nothing was applied — a patch carrying a conflict does not apply",
    ],
  })
  expect(patchIn(root, PAGE)).not.toBeNull()
})

test("a patch a mechanical draft opened is a diff git still reads", async () => {
  const root = await indexed()
  const draft = [{ path: PAGE, was: bytes(A), body: bytes(MORE) }]
  const nothing = { checks: false, writerOwesReading: false, readersOweReading: false }
  expect("why" in drafted(root, PAGE, draft, nothing)).toBe(false)
  expect(runningIn(patchIn(root, PAGE))).toEqual(nothing)
  expect(() => gitSaid(root, ["apply", "--check", patchAt(PAGE) as string])).not.toThrow()
})

const READER = "01a05f00-0000-7000-8000-000000000002"

const RESTATED = { checks: true, writerOwesReading: true, readersOweReading: false }

async function reading(running: typeof RESTATED | undefined): Promise<boolean> {
  const root = await indexed()
  const was = headOid(root, PAGE)
  recordRead(root, READER, { path: PAGE, oid: was, seenAt: 1, carriedOid: null })
  const draft = [{ path: PAGE, was: bytes(A), body: bytes(MORE) }]
  expect("why" in drafted(root, PAGE, draft, running)).toBe(false)
  const said = await applied(root, PAGE, AGENT, "applied", ADMITS, null)
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  return sameBody(readingIn(root, READER, PAGE), headOid(root, PAGE))
}

test("an apply owing its readers no reading carries their readings onto the bodies applied", async () => {
  expect(await reading(RESTATED)).toBe(true)
})

test("an apply whose readers owe reading carries none, so every reader goes stale", async () => {
  expect(await reading(undefined)).toBe(false)
})

test("a patch naming no reading flag for a path leaves that reader's record dropped", async () => {
  const root = await indexed()
  recordRead(root, READER, { path: PAGE, oid: headOid(root, PAGE), seenAt: 1, carriedOid: null })
  expect("why" in drafted(root, PAGE, [{ path: PAGE, was: bytes(A), body: bytes(MORE) }])).toBe(
    false
  )
  expect(patchIn(root, PAGE) ?? "").not.toContain("readersOweReading")

  const said = await applied(root, PAGE, AGENT, "applied", ADMITS, null)

  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  expect(readingIn(root, READER, PAGE)).toBeNull()
})

test("an apply naming the path whose readers owe no reading leaves that record standing", async () => {
  const root = await indexed()
  recordRead(root, READER, { path: PAGE, oid: headOid(root, PAGE), seenAt: 1, carriedOid: null })
  const draft = [{ path: PAGE, was: bytes(A), body: bytes(MORE), readersOweReading: false }]
  expect("why" in drafted(root, PAGE, draft)).toBe(false)
  expect(patchIn(root, PAGE) ?? "").toContain("readersOweReading: false")

  const said = await applied(root, PAGE, AGENT, "applied", ADMITS, null)

  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  expect(sameBody(readingIn(root, READER, PAGE), headOid(root, PAGE))).toBe(true)
})

test("a path the patch moved under has no reading recorded", async () => {
  const root = pagesRepo()
  drafting(root)
  writeFileSync(join(root, PAGE), `// first\n${A}`)
  gitSaid(root, ["add", "--", PAGE])
  gitSaid(root, ["commit", "-q", "-m", "moved", "--", PAGE])
  await applied(root, PAGE, AGENT, "applied", REFUSES, null)
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
})

test("a path an apply is handed as a carry moves on disk", async () => {
  const root = await indexed()
  drafting(root)
  writeFileSync(join(root, "held.uncommitted.ts"), "unsaid")
  const carries = [{ from: "held.uncommitted.ts", to: "deep/held.uncommitted.ts" }]
  const said = await applied(root, PAGE, AGENT, "applied", ADMITS, null, carries)
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  expect(readFileSync(join(root, "deep/held.uncommitted.ts"), "utf8")).toBe("unsaid")
  expect(existsSync(join(root, "held.uncommitted.ts"))).toBe(false)
})
