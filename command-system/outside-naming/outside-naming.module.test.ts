import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { baseOf } from "../landing/landing.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import {
  batchedIn,
  endedFor,
  escapedFor,
  namedTracked,
  outsideRespelt,
  reachedTracked,
  respeltNames,
  spelledTracked,
} from "./outside-naming.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const OUTSIDE_AT = "tools/lib/held.ts"

const INSIDE_AT = "akasha/one/held.ts"

const NAMED = new Map([["akasha/one", "akasha/far/one"]])

const PACKAGED = new Map([["@akasha/one", "@akasha/first"]])

const SPELT = `export const at = "akasha/one/held.ts"\n`

function world(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-outside-")
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

test("a name is respelled where a segment ends after it and left alone where one runs on", () => {
  const said = respeltNames('"akasha/one" "akasha/one-other" "akasha/one/held.ts"', NAMED)
  expect(said).toBe('"akasha/far/one" "akasha/one-other" "akasha/far/one/held.ts"')
})

test("a name a path character leads and a name a package name leads are left alone", () => {
  const said = respeltNames('xakasha/one "@akasha/one" "repo/akasha/one" "akasha/one"', NAMED)
  expect(said).toBe('xakasha/one "@akasha/one" "repo/akasha/one" "akasha/far/one"')
})

test("the longest name matching at one place is the name written back", () => {
  const named = new Map([...NAMED, ["akasha/one/held.ts", "akasha/far/held.ts"]])
  expect(respeltNames('"akasha/one/held.ts"', named)).toBe('"akasha/far/held.ts"')
})

test("a body naming nothing looked for comes back as that body was", () => {
  expect(respeltNames(SPELT, new Map())).toBe(SPELT)
})

test("a package name is respelled and a longer name it only opens is left alone", () => {
  const said = respeltNames('"@akasha/one/two" "@akasha/one-other" "@akasha/one"', PACKAGED)
  expect(said).toBe('"@akasha/first/two" "@akasha/one-other" "@akasha/first"')
})

test("what the caller leaves out of the search is left out, and the rest is looked at", () => {
  const root = world({ [OUTSIDE_AT]: SPELT, [INSIDE_AT]: SPELT })
  const apart = namedTracked(root, baseOf(root), ["akasha/one"], [":(exclude)akasha/"])
  expect("paths" in apart ? apart.paths : ["it refused"]).toEqual([OUTSIDE_AT])
  const whole = namedTracked(root, baseOf(root), ["akasha/one"], [])
  expect("paths" in whole ? whole.paths : ["it refused"]).toEqual([INSIDE_AT, OUTSIDE_AT])
})

test("a caller naming nothing is answered with no file", () => {
  const root = world({ [OUTSIDE_AT]: SPELT })
  const found = namedTracked(root, baseOf(root), [], [])
  expect("paths" in found ? found.paths : ["it refused"]).toEqual([])
})

test("a part is found where a slash sits beside the part and no more of a segment runs on", () => {
  const root = world({
    "tools/lib/reaches.ts": `export const at = "../one/held.ts"\n`,
    "tools/lib/carries.ts": `export const at = "../one-other/held.ts"\n`,
    "tools/lib/says.ts": "one thing said as prose, and one alone\n",
  })
  const found = reachedTracked(root, baseOf(root), ["one"], [])
  expect("paths" in found ? found.paths : ["it refused"]).toEqual(["tools/lib/reaches.ts"])
})

test("a file two parts both reach is answered once", () => {
  const root = world({ "tools/lib/reaches.ts": `export const at = "../one/held.ts"\n` })
  const found = reachedTracked(root, baseOf(root), ["one", "held.ts"], [])
  expect("paths" in found ? found.paths : ["it refused"]).toEqual(["tools/lib/reaches.ts"])
})

test("a character a pattern would read as a pattern is looked for as that character", () => {
  expect(escapedFor("one.two+three")).toBe("one\\.two\\+three")
  const root = world({ "tools/lib/reaches.ts": `export const at = "../oneXtwo/held.ts"\n` })
  const found = reachedTracked(root, baseOf(root), ["one.two"], [])
  expect("paths" in found ? found.paths : ["it refused"]).toEqual([])
})

test("more names than one command line carries are asked for over more calls", () => {
  const many = Array.from({ length: 20000 }, (_at, index) => `part-of-a-path-${index}`)
  const batches = batchedIn(many)
  expect(batches.length).toBeGreaterThan(1)
  expect(batches.flat()).toEqual(many)
  expect(batchedIn([]).length).toBe(0)
})

test("a body the respelling changed is answered with its bytes and the text it came from", () => {
  const root = world({ [OUTSIDE_AT]: SPELT })
  const found = outsideRespelt(root, baseOf(root), ["akasha/one"], (_path, text) =>
    respeltNames(text, NAMED)
  )
  const respelt = "respelt" in found ? found.respelt : []
  expect(respelt.map((one) => one.path)).toEqual([OUTSIDE_AT])
  expect(respelt.map((one) => one.was)).toEqual([SPELT])
  expect(respelt.map((one) => one.text)).toEqual([`export const at = "akasha/far/one/held.ts"\n`])
})

test("a body the respelling did not change is left out of the answer", () => {
  const root = world({ [OUTSIDE_AT]: SPELT })
  const found = outsideRespelt(root, baseOf(root), ["akasha/one"], (_path, text) => text)
  expect("respelt" in found ? found.respelt : ["it refused"]).toEqual([])
})

test("a whole name is found where its segment ends and left out where the segment runs on", () => {
  expect(endedFor("temper/one")).toBe("temper/one($|[^A-Za-z0-9._-])")
  const root = world({
    "tools/lib/holds.ts": `export const at = "temper/one/held.ts"\n`,
    "tools/lib/carries.ts": `export const at = "temper/one-other/held.ts"\n`,
    "tools/lib/opens.ts": `import "@scope/temper/one"\n`,
  })
  const found = spelledTracked(root, baseOf(root), ["temper/one"], [])
  expect("paths" in found ? found.paths : ["it refused"]).toEqual([
    "tools/lib/holds.ts",
    "tools/lib/opens.ts",
  ])
})

test("a caller spelling nothing is answered with no file rather than by asking git", () => {
  const root = world({ [OUTSIDE_AT]: SPELT })
  const found = spelledTracked(root, "no-commit-of-that-name", [], [])
  expect("paths" in found ? found.paths : ["it refused"]).toEqual([])
})
