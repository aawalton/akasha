import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import {
  checkPagesIn,
  checksAt,
  checksIn,
  everyFileIn,
  everythingIn,
  judgingBy,
  onDisk,
  overEachFile,
} from "./checking.module.code.ts"

const CHECKS_AT = ".git/data/index/identity/check/slug"

const PAGES_AT = ".git/data/index/identity/page/id"

const PATHS_AT = ".git/data/index/identity/page/path"

function filed(root: string, at: string, line: string): void {
  const to = join(root, PATHS_AT, `${at}.jsonl`)
  mkdirSync(dirname(to), { recursive: true })
  writeFileSync(to, line)
}

function rootWith(
  named: readonly {
    readonly slug: string
    readonly runsOn: readonly string[]
    readonly body: string
  }[]
): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-checking-"))
  mkdirSync(join(root, CHECKS_AT), { recursive: true })
  mkdirSync(join(root, PAGES_AT), { recursive: true })
  mkdirSync(join(root, PATHS_AT), { recursive: true })
  let minted = 0
  for (const one of named) {
    const at = `akasha/checks-system/check/${one.slug}/${one.slug}.check.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
    writeFileSync(
      join(root, at),
      `export const ${camel} = {\n` +
        `  slug: "${one.slug}",\n` +
        `  code: "ts",\n` +
        `  runsOn: ${JSON.stringify(one.runsOn)},\n` +
        `}\n`
    )
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    minted = minted + 1
    const id = `01a04bc4-0000-7000-8000-00000000000${minted}`
    const line = `${JSON.stringify({ path: at, id })}\n`
    writeFileSync(join(root, CHECKS_AT, `${one.slug}.jsonl`), line)
    writeFileSync(join(root, PAGES_AT, `${id}.jsonl`), line)
    filed(root, at, line)
    filed(root, `${at.slice(0, -".ts".length)}.code.ts`, line)
  }
  return root
}

const REFUSES_ALL =
  "export function refusesAll(leaving) {\n" +
  '  return leaving.changed.map((path) => ({ path, reason: "refused" }))\n' +
  "}\n"

const ADMITS_ALL = `export function admitsAll() {\n  return []\n}\n`

const THROWS = `export function throws() {\n  throw new Error("could not look")\n}\n`

const REFUSES_TAKING =
  "export function refusesTaking(leaving) {\n" +
  "  return leaving.changed\n" +
  "    .filter((path) => leaving.at(path) === null)\n" +
  '    .map((path) => ({ path, reason: "`" + path + "` may not be taken away" }))\n' +
  "}\n"

test("a check is found through the index rather than by walking the tree", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const found = checksIn(root)
  expect(found.map((one) => one.slug)).toEqual(["admits-all"])
  expect(found[0]?.page).toBe("akasha/checks-system/check/admits-all/admits-all.check.ts")
  rmSync(root, { recursive: true })
})

test("a check is run once over the whole change, and never over the rest of the tree", () => {
  const root = rootWith([{ slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL }])
  writeFileSync(join(root, "one.ts"), "one")
  writeFileSync(join(root, "two.ts"), "two")
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    at: onDisk(root),
  })
  expect(said.map((one) => one.path)).toEqual(["one.ts"])
  rmSync(root, { recursive: true })
})

test("a check that threw refuses the change it could not judge, and the refusal names its page", () => {
  const root = rootWith([{ slug: "throws", runsOn: ["patch"], body: THROWS }])
  writeFileSync(join(root, "one.ts"), "one")
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    at: onDisk(root),
  })
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/checks-system/check/throws/throws.check.ts")
  expect(said[0]?.reason).toContain("could not look")
  rmSync(root, { recursive: true })
})

test("a path the change takes away is handed to every check, and can be refused", () => {
  const root = rootWith([{ slug: "refuses-taking", runsOn: ["patch"], body: REFUSES_TAKING }])
  writeFileSync(join(root, "stays.ts"), "stays")
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["gone.ts", "stays.ts"],
    at: onDisk(root),
  })
  expect(said.map((one) => one.path)).toEqual(["gone.ts"])
  expect(said[0]?.reason).toContain("may not be taken away")
  rmSync(root, { recursive: true })
})

test("the helper hands over each body the change leaves standing, and no path it takes away", () => {
  const root = mkdtempSync(join(tmpdir(), "akasha-each-file-"))
  writeFileSync(join(root, "here.ts"), "here")
  const said = overEachFile(
    { root, changed: ["gone.ts", "here.ts"], at: onDisk(root) },
    (given) => [`${given.path} holds ${given.bytes.length} bytes`]
  )
  expect(said).toEqual([{ path: "here.ts", reason: "here.ts holds 4 bytes" }])
  rmSync(root, { recursive: true })
})

test("a phase takes only the checks that state it", () => {
  const root = rootWith([
    { slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL },
    { slug: "refuses-all", runsOn: ["deploy"], body: REFUSES_ALL },
  ])
  const every = checksIn(root)
  expect(checksAt(every, "patch").map((one) => one.slug)).toEqual(["admits-all"])
  expect(checksAt(every, "deploy").map((one) => one.slug)).toEqual(["refuses-all"])
  expect(checksAt(every, "worktree")).toEqual([])
  rmSync(root, { recursive: true })
})

test("audit takes a page and the files its own properties imply", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const every = everyFileIn(root)
  expect(every).toContain("akasha/checks-system/check/admits-all/admits-all.check.ts")
  expect(every).toContain("akasha/checks-system/check/admits-all/admits-all.check.code.ts")
  rmSync(root, { recursive: true })
})

test("audit takes the paths the index files, and works none of them out from a property name", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const at = "akasha/checks-system/check/admits-all/admits-all.check.ts"
  const id = "01a04bc4-0000-7000-8000-000000000001"
  filed(root, `${at.slice(0, -".ts".length)}.note.md`, `${JSON.stringify({ path: at, id })}\n`)
  const every = everyFileIn(root)
  expect(every).toContain("akasha/checks-system/check/admits-all/admits-all.check.note.md")
  rmSync(root, { recursive: true })
})

test("audit reads no page module to work out what stands, so a page it cannot load is still taken", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const at = "akasha/checks-system/check/admits-all/admits-all.check.ts"
  writeFileSync(join(root, at), "this is not typescript at all (((\n")
  expect(everyFileIn(root)).toContain(`${at.slice(0, -".ts".length)}.code.ts`)
  rmSync(root, { recursive: true })
})

test("audit reads the body of every file it takes", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const leaving = everythingIn(root)
  expect(leaving.root).toBe(root)
  expect(leaving.changed.length).toBeGreaterThan(0)
  for (const path of leaving.changed) expect(leaving.at(path)).not.toBeNull()
  rmSync(root, { recursive: true })
})

test("a check page whose code is not there stops the whole run", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  rmSync(join(root, "akasha/checks-system/check/admits-all/admits-all.check.code.ts"))
  expect(() => checksIn(root)).toThrow("answers to nothing that can be run")
  rmSync(root, { recursive: true })
})

test("a check page stating no runsOn a runner can honour is refused", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["tree"], body: ADMITS_ALL }])
  expect(() => checksIn(root)).toThrow("states no `runsOn`")
  rmSync(root, { recursive: true })
})

test("an index holding no check directory cannot answer, and is not read as naming none", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  rmSync(join(root, ".git/data/index/identity/check"), { recursive: true })
  expect(() => checkPagesIn(root)).toThrow("could not be answered")
  expect(() => checksIn(root)).toThrow(CHECKS_AT)
  rmSync(root, { recursive: true })
})

test("an index holding no path directory cannot answer, so the audit refuses rather than taking nothing", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  rmSync(join(root, PATHS_AT), { recursive: true })
  expect(() => everyFileIn(root)).toThrow("could not be answered")
  expect(() => everythingIn(root)).toThrow(PATHS_AT)
  rmSync(root, { recursive: true })
})

test("an index naming no check refuses, a change judged by nothing being no change judged clean", () => {
  const root = rootWith([])
  expect(checkPagesIn(root)).toEqual([])
  expect(() => checksIn(root)).toThrow("names no check")
  rmSync(root, { recursive: true })
})

test("checks standing but none at a phase leaves that phase empty rather than refusing", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: [], body: ADMITS_ALL }])
  const every = checksIn(root)
  expect(every.map((one) => one.slug)).toEqual(["admits-all"])
  expect(judgingBy(checksAt(every, "patch")).named).toEqual([])
  rmSync(root, { recursive: true })
})
