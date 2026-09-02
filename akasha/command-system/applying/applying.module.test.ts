import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
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

function indexed(): string {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, CARRIED, "held", ADMITS)
  landing(root, [{ path: PAGE, body: bytes(A) }], "held", ADMITS)
  return root
}

function drafting(root: string): undefined {
  expect("why" in drafted(root, PAGE, [{ path: PAGE, was: A, body: MORE }])).toBe(false)
}

function refs(root: string): string {
  return gitSaid(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/patch"])
}

test("a patch applied lands its bodies and takes the patch away", () => {
  const root = indexed()
  drafting(root)
  const said = applied(root, PAGE, AGENT, "applied", ADMITS, null)
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(MORE)
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("an apply the gate refused leaves the patch where the patch is", () => {
  const root = pagesRepo()
  drafting(root)
  const said = applied(root, PAGE, AGENT, "applied", REFUSES, null)
  expect("refusals" in said).toBe(true)
  expect(patchIn(root, PAGE)).not.toBeNull()
  expect(readFileSync(join(root, PAGE), "utf8")).toBe(A)
})

test("no patch kept is nothing to apply", () => {
  const said = applied(pagesRepo(), PAGE, AGENT, "applied", ADMITS, null)
  expect("refusals" in said).toBe(true)
})

test("a reading wiped away is recorded again for a path that did not move", () => {
  const root = pagesRepo()
  drafting(root)
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
  applied(root, PAGE, AGENT, "applied", REFUSES, null)
  expect(readingIn(root, AGENT, PAGE)?.oid).toBe(
    gitSaid(root, ["rev-parse", `HEAD:${PAGE}`]).trim()
  )
})

test("a path the patch moved under has no reading recorded", () => {
  const root = pagesRepo()
  drafting(root)
  writeFileSync(join(root, PAGE), `// first\n${A}`)
  gitSaid(root, ["add", "--", PAGE])
  gitSaid(root, ["commit", "-q", "-m", "moved", "--", PAGE])
  applied(root, PAGE, AGENT, "applied", REFUSES, null)
  expect(readingIn(root, AGENT, PAGE)).toBeNull()
})
