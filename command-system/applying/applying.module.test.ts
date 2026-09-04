import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import { CLASH_MARK } from "../body-merging/body-merging.module.code.ts"
import { drafted } from "../drafting/drafting.module.code.ts"
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
import { readingIn } from "../reading/reading.module.code.ts"
import { applied } from "./applying.module.code.ts"

const AGENT = "01a05f00-0000-7000-8000-000000000001"

const MORE = `${A}// drafted\n`

afterAll(() => {
  scratch.sweep()
})

async function indexed(): Promise<string> {
  const root = repoWith({ "seed.txt": "held" })
  await landing(root, CARRIED, "held", ADMITS)
  await landing(root, [{ path: PAGE, body: bytes(A) }], "held", ADMITS)
  return root
}

function drafting(root: string): undefined {
  expect("why" in drafted(root, PAGE, [{ path: PAGE, was: A, body: MORE }])).toBe(false)
}

function refs(root: string): string {
  return gitSaid(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/patch"])
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
  expect(refs(root)).toBe("")
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
  expect("why" in drafted(root, PAGE, [{ path: PAGE, was: A, body: marked }])).toBe(false)
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

test("a path the patch moved under has no reading recorded", async () => {
  const root = pagesRepo()
  drafting(root)
  writeFileSync(join(root, PAGE), `// first\n${A}`)
  gitSaid(root, ["add", "--", PAGE])
  gitSaid(root, ["commit", "-q", "-m", "moved", "--", PAGE])
  await applied(root, PAGE, AGENT, "applied", REFUSES, null)
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
})
