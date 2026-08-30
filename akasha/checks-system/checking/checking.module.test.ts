import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import {
  identitiesTakenFrom,
  idFiled,
  noneOfTypeFiled,
  pathFiled,
  pathsTakenFrom,
  standingFiled,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import type { Reading } from "../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { shadowAt } from "../../pages-system/shadow/shadow.module.code.ts"
import {
  checkPagesIn,
  checksAt,
  checksIn,
  everyFileIn,
  everythingIn,
  judgingBy,
  judgingEachFile,
  onDisk,
  overEachFile,
  overEachText,
} from "./checking.module.code.ts"

const CHECK = "check"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootWith(
  named: readonly {
    readonly slug: string
    readonly runsOn: readonly string[]
    readonly raw?: string
    readonly body: string
  }[]
): string {
  const root = scratch.rootFor("akasha-checking-")
  noneOfTypeFiled(root, CHECK)
  let minted = 0
  for (const one of named) {
    const at = `akasha/checks-system/check/${one.slug}/${one.slug}.check.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    writeFileSync(
      join(root, at),
      `export const ${exportedAs(one.slug)} = {\n` +
        `  slug: "${one.slug}",\n` +
        `  code: "ts",\n` +
        (one.raw ??
          `  runsOnPatch: ${one.runsOn.includes("patch")},\n` +
            `  runsOnWorktree: ${one.runsOn.includes("worktree")},\n` +
            `  runsOnDeploy: ${one.runsOn.includes("deploy")},\n` +
            `  runsOnAudit: ${one.runsOn.includes("audit")},\n`) +
        `}\n`
    )
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    minted = minted + 1
    const id = `01a04bc4-0000-7000-8000-00000000000${minted}`
    const held = [{ path: at, id }]
    standingFiled(root, CHECK, one.slug, held)
    idFiled(root, id, held)
    pathFiled(root, at, held)
    pathFiled(root, `${at.slice(0, -".ts".length)}.code.ts`, held)
  }
  return root
}

const REFUSES_ALL =
  "export function refusesAll(leaving) {\n" +
  '  return leaving.changed.map((path) => ({ path, reason: "refused" }))\n' +
  "}\n"

const ADMITS_ALL = `export function admitsAll() {\n  return []\n}\n`

const THROWS = `export function throws() {\n  throw new Error("could not look")\n}\n`

const NAMES_SHADOW =
  "export function namesShadow(leaving, shadow) {\n" +
  '  const held = shadow !== undefined && typeof shadow.pageOf === "function"\n' +
  "  return held && shadow.reading !== undefined\n" +
  "    ? []\n" +
  '    : [{ path: "shadow", reason: "no shadow was handed over" }]\n' +
  "}\n"

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
})

test("a check is run once over the whole change, and never over the rest of the tree", () => {
  const root = rootWith([{ slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL }])
  writeFileSync(join(root, "one.ts"), "one")
  writeFileSync(join(root, "two.ts"), "two")
  const held = onDisk(root)
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    at: held,
    was: held,
  })
  expect(said.map((one) => one.path)).toEqual(["one.ts"])
})

test("a check that threw refuses the change it could not judge, and the refusal names its page", () => {
  const root = rootWith([{ slug: "throws", runsOn: ["patch"], body: THROWS }])
  writeFileSync(join(root, "one.ts"), "one")
  const held = onDisk(root)
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    at: held,
    was: held,
  })
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/checks-system/check/throws/throws.check.ts")
  expect(said[0]?.reason).toContain("could not look")
})

test("a path the change takes away is handed to every check, and can be refused", () => {
  const root = rootWith([{ slug: "refuses-taking", runsOn: ["patch"], body: REFUSES_TAKING }])
  writeFileSync(join(root, "stays.ts"), "stays")
  const held = onDisk(root)
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["gone.ts", "stays.ts"],
    at: held,
    was: held,
  })
  expect(said.map((one) => one.path)).toEqual(["gone.ts"])
  expect(said[0]?.reason).toContain("may not be taken away")
})

test("the helper hands over each body the change leaves standing, and no path it takes away", () => {
  const root = scratch.rootFor("akasha-each-file-")
  writeFileSync(join(root, "here.ts"), "here")
  const said = overEachFile(
    { root, changed: ["gone.ts", "here.ts"], at: onDisk(root), was: onDisk(root) },
    (given) => [`${given.path} holds ${given.bytes.length} bytes`]
  )
  expect(said).toEqual([{ path: "here.ts", reason: "here.ts holds 4 bytes" }])
})

test("reading each text hands the path and the body on, and passes over what is no TypeScript", () => {
  const seen: string[] = []
  const judge = overEachText((path, text) => {
    seen.push(path)
    return [`${path} says ${text.length}`]
  })
  const bytes = new TextEncoder().encode("held")
  expect(judge({ root: "/nowhere", path: "one.ts", bytes })).toEqual(["one.ts says 4"])
  expect(judge({ root: "/nowhere", path: "one.md", bytes })).toEqual([])
  expect(seen).toEqual(["one.ts"])
})

test("reading each text passes over a body that is no text at all", () => {
  const judge = overEachText(() => ["read"])
  const bytes = Uint8Array.from([0xff, 0xfe, 0xfd])
  expect(judge({ root: "/nowhere", path: "one.ts", bytes })).toEqual([])
})

test("judging each file makes a runner of a judge, naming the path each refusal is for", () => {
  const root = scratch.rootFor("akasha-each-run-")
  writeFileSync(join(root, "here.ts"), "here")
  const run = judgingEachFile((given) => [`${given.path} holds ${given.bytes.length} bytes`])
  const held = onDisk(root)
  expect(
    run({ root, changed: ["gone.ts", "here.ts"], at: held, was: held }, shadowAt(root))
  ).toEqual([{ path: "here.ts", reason: "here.ts holds 4 bytes" }])
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
})

test("audit takes a page and the files its own properties imply", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const every = everyFileIn(root)
  expect(every).toContain("akasha/checks-system/check/admits-all/admits-all.check.ts")
  expect(every).toContain("akasha/checks-system/check/admits-all/admits-all.check.code.ts")
})

test("audit takes the paths the index files, and works none of them out from a property name", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const at = "akasha/checks-system/check/admits-all/admits-all.check.ts"
  const id = "01a04bc4-0000-7000-8000-000000000001"
  pathFiled(root, `${at.slice(0, -".ts".length)}.note.md`, [{ path: at, id }])
  const every = everyFileIn(root)
  expect(every).toContain("akasha/checks-system/check/admits-all/admits-all.check.note.md")
})

test("audit reads no page module to work out what stands, so a page it cannot load is still taken", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const at = "akasha/checks-system/check/admits-all/admits-all.check.ts"
  writeFileSync(join(root, at), "this is not typescript at all (((\n")
  expect(everyFileIn(root)).toContain(`${at.slice(0, -".ts".length)}.code.ts`)
})

test("audit reads the body of every file it takes", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const leaving = everythingIn(root)
  expect(leaving.root).toBe(root)
  expect(leaving.changed.length).toBeGreaterThan(0)
  for (const path of leaving.changed) expect(leaving.at(path)).not.toBeNull()
})

test("a check page whose code is not there stops the whole run", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  rmSync(join(root, "akasha/checks-system/check/admits-all/admits-all.check.code.ts"))
  expect(() => checksIn(root)).toThrow("answers to nothing that can be run")
})

test("a check page stating no phase a runner can honour is refused", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: [], raw: "", body: ADMITS_ALL }])
  expect(() => checksIn(root)).toThrow("states no phase")
})

test("an index holding no check directory cannot answer, and is not read as naming none", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  identitiesTakenFrom(root, CHECK)
  expect(() => checkPagesIn(root)).toThrow("could not be answered")
  expect(() => checksIn(root)).toThrow("identity/check/slug")
})

test("an index holding no path directory cannot answer, so the audit refuses rather than taking nothing", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  pathsTakenFrom(root)
  expect(() => everyFileIn(root)).toThrow("could not be answered")
  expect(() => everythingIn(root)).toThrow("is not an index naming none")
})

const HANDED: Reading = {
  holds: () => false,
  listing: (at) => {
    if (at === "path") return [{ name: "akasha", directory: true }]
    if (at === "path/akasha") return [{ name: "held.ts.jsonl", directory: false }]
    return []
  },
  lines: () => [],
}

test("a reading handed in says which files stand, so a check may ask of the index it will leave", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  expect(everyFileIn(root, HANDED)).toEqual(["akasha/held.ts"])
})

test("a reading handed in does not stand in for the guard, which is on the root and stays", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  pathsTakenFrom(root)
  expect(() => everyFileIn(root, HANDED)).toThrow("could not be answered")
})

test("an index naming no check refuses, a change judged by nothing being no change judged clean", () => {
  const root = rootWith([])
  expect(checkPagesIn(root)).toEqual([])
  expect(() => checksIn(root)).toThrow("names no check")
})

test("checks standing but none at a phase leaves that phase empty rather than refusing", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: [], body: ADMITS_ALL }])
  const every = checksIn(root)
  expect(every.map((one) => one.slug)).toEqual(["admits-all"])
  expect(judgingBy(checksAt(every, "patch")).named).toEqual([])
})

test("one shadow is cast over the change and handed to every check that runs", () => {
  const root = rootWith([{ slug: "names-shadow", runsOn: ["patch"], body: NAMES_SHADOW }])
  writeFileSync(join(root, "one.ts"), "one")
  const held = onDisk(root)
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    at: held,
    was: held,
  })
  expect(said).toEqual([])
})
