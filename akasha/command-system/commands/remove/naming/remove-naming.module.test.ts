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
  nameDeclaredIn,
  namesDeclared,
} from "./remove-naming.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const GOING = "temper/one-held/main.ts"

const NAMER = "tools/lib/reads.ts"

const INSIDE_AT = "akasha/one/reads.ts"

const RECORD = "akasha/domain-system/findings/pages/one-held-went.finding.ts"

const BODY = `export const at = "temper/one-held/main.ts"\n`

const WORDED = "temper/curse"

const WORDED_AT = "temper/curse/main-page.md"

const HELD = "a page that goes\n"

const PROSE = "tools/lib/prose.md"

const MANIFEST_AT = "shared/pages-ui/package.json"

const MANIFEST = `{ "name": "@akasha/pages-ui", "version": "0.1.0" }\n`

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

function reachesIn(found: ReturnType<typeof leftNaming>): readonly string[] {
  return "reaches" in found ? found.reaches : ["it refused"]
}

function wordedIn(body: string): ReturnType<typeof leftNaming> {
  const root = world({ [WORDED_AT]: HELD, [PROSE]: body })
  return leftNaming(root, baseOf(root), [WORDED], [WORDED_AT], new Set([WORDED_AT]))
}

test("a directory you named is looked for whole and never by its own last part", () => {
  const looked = lookedFor(["temper/one-held", "temper/one-held"], ["temper/one-held/main.ts"])
  expect(looked.whole).toEqual(["temper/one-held"])
  expect(looked.parts).toEqual(["main.ts"])
})

test("a file you named is looked for whole and by its own last part", () => {
  const looked = lookedFor(["temper/one-held/main.ts"], [])
  expect(looked.whole).toEqual(["temper/one-held/main.ts"])
  expect(looked.parts).toEqual(["main.ts"])
  expect(lookedFor(["held.ts"], [])).toEqual({ whole: ["held.ts"], parts: [] })
})

test("each file under a directory you named is looked for by that file's last part", () => {
  const under = ["temper/one-held/main.ts", "temper/one-held/in/other.ts"]
  expect(lookedFor(["temper/one-held"], under).parts).toEqual(["main.ts", "other.ts"])
})

test("prose spelling the last part of a directory with no slash beside it is not a reach", () => {
  const found = wordedIn("The curse of the dunce fell on him, and the curse held.\n")
  expect(namersIn(found)).toEqual([])
  expect(reachesIn(found)).toEqual([])
})

test("a body spelling a directory's own last part beside a slash is not swept up", () => {
  const found = wordedIn(`{ "kind": "page-type/curse" }\n`)
  expect(namersIn(found)).toEqual([])
  expect(reachesIn(found)).toEqual([])
})

test("a body reaching a file under a directory that goes by its last part is swept up", () => {
  const found = wordedIn(`import "@scope/held/main-page.md"\n`)
  expect(namersIn(found)).toEqual([])
  expect(reachesIn(found)).toEqual([PROSE])
})

test("a file naming what goes is found wherever it sits, inside the akasha folder or outside", () => {
  const root = world({ [GOING]: BODY, [NAMER]: BODY, [INSIDE_AT]: BODY })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], [GOING], new Set([GOING]))
  expect(namersIn(found)).toEqual([INSIDE_AT, NAMER])
})

test("a file reaching a file that goes by a relative path is swept up by its last part", () => {
  const root = world({ [GOING]: BODY, [NAMER]: `{ "path": "../main.ts" }\n` })
  const found = leftNaming(root, baseOf(root), [GOING], [], new Set([GOING]))
  expect(namersIn(found)).toEqual([])
  expect(reachesIn(found)).toEqual([NAMER])
})

test("a path a longer path only opens is not named by the file naming that longer path", () => {
  const root = world({
    [GOING]: BODY,
    "temper/one-held-ui/main.ts": `export const held = 1\n`,
    [NAMER]: `import "temper/one-held-ui/main.ts"\n`,
  })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], [GOING], new Set([GOING]))
  expect(namersIn(found)).toEqual([])
})

test("a last part every folder carries reaches wide, and never as a file that names what goes", () => {
  const root = world({
    "temper/one-held/package.json": `{ "name": "@temper/one-held" }\n`,
    "tools/lib/elsewhere.ts": `export const at = "infra/other/package.json"\n`,
  })
  const under = ["temper/one-held/package.json"]
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], under, new Set(under))
  expect(namersIn(found)).toEqual([])
  expect(reachesIn(found)).toEqual(["tools/lib/elsewhere.ts"])
})

test("the package name a manifest that goes declares is looked for where the path is not", () => {
  expect(nameDeclaredIn(MANIFEST)).toBe("@akasha/pages-ui")
  expect(nameDeclaredIn("{ oh no\n")).toBeNull()
  expect(nameDeclaredIn(`{ "version": "1" }`)).toBeNull()
  const root = world({
    [MANIFEST_AT]: MANIFEST,
    [NAMER]: `import { held } from "@akasha/pages-ui/held"\n`,
    [PROSE]: "@akasha/pages-ui-other is another package\n",
  })
  expect(namesDeclared(root, baseOf(root), [MANIFEST_AT])).toEqual(["@akasha/pages-ui"])
  const under = [MANIFEST_AT]
  const found = leftNaming(root, baseOf(root), ["shared/pages-ui"], under, new Set(under))
  expect(namersIn(found)).toEqual([NAMER])
})

test("a finding naming what goes is answered apart from the files that would be repointed", () => {
  const root = world({ [GOING]: BODY, [NAMER]: BODY, [RECORD]: BODY })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], [GOING], new Set([GOING]))
  expect(namersIn(found)).toEqual([NAMER])
  expect("recorded" in found ? found.recorded : []).toEqual([RECORD])
})

test("a file the removal takes is left out of what is answered", () => {
  const root = world({ [GOING]: BODY, "temper/one-held/other.ts": BODY })
  const under = [GOING, "temper/one-held/other.ts"]
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], under, new Set(under))
  expect(namersIn(found)).toEqual([])
  expect(reachesIn(found)).toEqual([])
})

test("a name a package name leads is found, since that is how a package is reached", () => {
  const root = world({ [GOING]: BODY, [NAMER]: `import "@temper/one-held/main.ts"\n` })
  const found = leftNaming(root, baseOf(root), ["temper/one-held"], [GOING], new Set([GOING]))
  expect(namersIn(found)).toEqual([NAMER])
  expect(reachesIn(found)).toEqual([])
})

test("a caller naming nothing asks git nothing and is answered with no file", () => {
  const root = world({ [NAMER]: BODY })
  expect(namersIn(leftNaming(root, "no-commit-of-that-name", [], [], new Set()))).toEqual([])
})

test("a search git could not run is answered as a refusal rather than as nothing found", () => {
  const root = world({ [NAMER]: BODY })
  const found = leftNaming(root, "no-commit-of-that-name", ["temper/one-held"], [], new Set())
  expect("refusal" in found ? found.refusal : "").toContain("git could not say")
})

test("what was found and what was looked for are both said, and finding nothing is said too", () => {
  expect(leftNamingSaid([], { ...NAMING_NOTHING, namers: [NAMER] })).toEqual([])
  const none = leftNamingSaid(["temper/one-held"], NAMING_NOTHING)
  expect(none[0]).toBe("no tracked file left behind names what went")
  expect(none.at(-1)).toContain("out of pieces")
  const some = leftNamingSaid(["temper/one-held"], {
    namers: [NAMER],
    reaches: [],
    recorded: [RECORD],
  })
  expect(some[0]).toContain("what went is still named by 1 tracked file left behind")
  expect(some[0]).toContain(NAMER)
  expect(some[1]).toContain("what went is named as a record of what was so by 1 finding")
  expect(some[1]).toContain(RECORD)
})

test("the wider sweep is said apart from what names what goes, and only where it found any", () => {
  const said = leftNamingSaid(["temper/one-held"], {
    namers: [],
    reaches: [PROSE, INSIDE_AT],
    recorded: [],
  })
  expect(said[0]).toBe("no tracked file left behind names what went")
  expect(said[2]).toContain("a wider sweep than that one reaches 2 further tracked files")
  expect(said[2]).toContain(PROSE)
  expect(said.at(-1)).toContain("every `main.ts` the repository holds")
  const none = leftNamingSaid(["temper/one-held"], NAMING_NOTHING)
  expect(none.join("\n")).not.toContain("a wider sweep")
})
