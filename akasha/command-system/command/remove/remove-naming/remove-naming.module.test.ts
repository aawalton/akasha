import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { baseOf } from "../../../landing/landing.module.code.ts"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  leftNaming,
  leftNamingSaid,
  lookedFor,
  NAMING_NOTHING,
} from "./remove-naming.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const GOING = "temper/one-held/main.ts"

const NAMER = "tools/lib/reads.ts"

const INSIDE_AT = "akasha/one/reads.ts"

const RECORD = "akasha/domain-system/findings/pages/one-held-went.finding.ts"

const BODY = `export const at = "temper/one-held/main.ts"\n`

function world(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-remove-naming-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

function namersIn(found: ReturnType<typeof leftNaming>): readonly string[] {
  return "namers" in found ? found.namers : ["it refused"]
}

test("a path is looked for whole and by its last part, each spelled once", () => {
  expect(lookedFor(["temper/one-held", "temper/one-held"])).toEqual(["one-held", "temper/one-held"])
  expect(lookedFor(["held.ts"])).toEqual(["held.ts"])
})

test("a file naming what goes is found wherever it sits, inside the akasha folder or outside", () => {
  const root = world({ [GOING]: BODY, [NAMER]: BODY, [INSIDE_AT]: BODY })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], new Set([GOING]))
  expect(namersIn(found)).toEqual([INSIDE_AT, NAMER])
})

test("a file reaching what goes by a relative path is found by the last part of that path", () => {
  const root = world({ [GOING]: BODY, [NAMER]: `{ "path": "../one-held" }\n` })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], new Set([GOING]))
  expect(namersIn(found)).toEqual([NAMER])
})

test("a finding naming what goes is answered apart from the files that would be repointed", () => {
  const root = world({ [GOING]: BODY, [NAMER]: BODY, [RECORD]: BODY })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], new Set([GOING]))
  expect(namersIn(found)).toEqual([NAMER])
  expect("recorded" in found ? found.recorded : []).toEqual([RECORD])
})

test("a file the removal takes is left out of what is answered", () => {
  const root = world({ [GOING]: BODY, "temper/one-held/other.ts": BODY })
  const going = new Set([GOING, "temper/one-held/other.ts"])
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], going)
  expect(namersIn(found)).toEqual([])
})

test("a name a package name leads is found, since that is how a package is reached", () => {
  const root = world({ [GOING]: BODY, [NAMER]: `import "@temper/one-held/main.ts"\n` })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], new Set([GOING]))
  expect(namersIn(found)).toEqual([NAMER])
})

test("a caller naming nothing asks git nothing and is answered with no file", () => {
  const root = world({ [NAMER]: BODY })
  expect(namersIn(leftNaming(root, "no-commit-of-that-name", [], new Set()))).toEqual([])
})

test("a search git could not run is answered as a refusal rather than as nothing found", () => {
  const root = world({ [NAMER]: BODY })
  const found = leftNaming(root, "no-commit-of-that-name", ["temper/one-held"], new Set())
  expect("refusal" in found ? found.refusal : "").toContain("git could not say")
})

test("what was found and what was looked for are both said, and finding nothing is said too", () => {
  expect(leftNamingSaid([], { namers: [NAMER], recorded: [] }, false)).toEqual([])
  const none = leftNamingSaid(["temper/one-held"], NAMING_NOTHING, true)
  expect(none[0]).toBe("no tracked file left behind names what would go")
  expect(none.at(-1)).toContain("out of pieces")
  const some = leftNamingSaid(["temper/one-held"], { namers: [NAMER], recorded: [RECORD] }, false)
  expect(some[0]).toContain("what went is still named by 1 tracked file left behind")
  expect(some[0]).toContain(NAMER)
  expect(some[1]).toContain("1 finding names what went as a record")
  expect(some[1]).toContain(RECORD)
})
