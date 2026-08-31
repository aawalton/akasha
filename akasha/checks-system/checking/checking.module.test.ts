import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import {
  identitiesTakenFrom,
  idFiled,
  idTakenFrom,
  noneOfTypeFiled,
  pathFiled,
  standingFiled,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { onDisk } from "../change-walking/change-walking.module.code.ts"
import { checkPagesIn, checksAt, checksIn, judgingBy } from "./checking.module.code.ts"

const CHECK = "check"

const PAGE = "page"

const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const scratch = scratchWorld()

afterAll(scratch.sweep)

type Stands = {
  readonly slug: string
  readonly at: string
}

const STANDS: Stands = { slug: CHECK, at: "akasha/checks-system/check/check.page-type.ts" }

function rootWith(
  named: readonly {
    readonly slug: string
    readonly runsOn: readonly string[]
    readonly raw?: string
    readonly body: string
  }[],
  stands: Stands = STANDS
): string {
  const root = scratch.rootFor("akasha-checking-")
  noneOfTypeFiled(root, stands.slug)
  idFiled(root, CHECK_TYPE, [{ path: stands.at, id: CHECK_TYPE }])
  let minted = 0
  for (const one of named) {
    const at = `akasha/checks-system/check/${one.slug}/${one.slug}.${stands.slug}.ts`
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
    standingFiled(root, stands.slug, one.slug, held)
    idFiled(root, id, held)
    pathFiled(root, at, held)
    pathFiled(root, `${at.slice(0, -".ts".length)}.code.ts`, held)
  }
  return root
}

const REFUSES_ALL =
  "export function refusesAll(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "refused" }))\n' +
  "}\n"

const ADMITS_ALL = `export function admitsAll() {\n  return []\n}\n`

const THROWS = `export function throws() {\n  throw new Error("could not look")\n}\n`

const NAMES_SHADOW =
  "export function namesShadow(change, shadow) {\n" +
  '  const held = shadow !== undefined && typeof shadow.pageOf === "function"\n' +
  "  return held && shadow.reading !== undefined\n" +
  "    ? []\n" +
  '    : [{ path: "shadow", reason: "no shadow was handed over" }]\n' +
  "}\n"

const REFUSES_TAKING =
  "export function refusesTaking(change) {\n" +
  "  return change.changed\n" +
  "    .filter((path) => change.after(path) === null)\n" +
  '    .map((path) => ({ path, reason: "`" + path + "` may not be taken away" }))\n' +
  "}\n"
test("a check is found through the index rather than by walking the tree", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const found = checksIn(root)
  expect(found.map((one) => one.slug)).toEqual(["admits-all"])
  expect(found[0]?.page).toBe("akasha/checks-system/check/admits-all/admits-all.check.ts")
})

test("a check is found by the id its page type carries, whatever slug that page type stands under", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }], {
    slug: "gate",
    at: "akasha/gate.page-type.ts",
  })
  expect(checkPagesIn(root)).toEqual(["akasha/checks-system/check/admits-all/admits-all.gate.ts"])
  expect(checksIn(root).map((one) => one.slug)).toEqual(["admits-all"])
})

test("a check is run once over the whole change, and never over the rest of the tree", () => {
  const root = rootWith([{ slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL }])
  writeFileSync(join(root, "one.ts"), "one")
  writeFileSync(join(root, "two.ts"), "two")
  const held = onDisk(root)
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    after: held,
    before: held,
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
    after: held,
    before: held,
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
    after: held,
    before: held,
  })
  expect(said.map((one) => one.path)).toEqual(["gone.ts"])
  expect(said[0]?.reason).toContain("may not be taken away")
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

test("an index holding no id directory cannot say which pages are checks, and is not read as naming none", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  identitiesTakenFrom(root, PAGE)
  expect(() => checkPagesIn(root)).toThrow("identity/page/id")
  expect(() => checksIn(root)).toThrow("is not an index naming none")
})

test("an id directory standing but carrying no check page type answers as absent rather than as missing", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  idTakenFrom(root, CHECK_TYPE)
  expect(() => checkPagesIn(root)).toThrow("nothing says which pages are checks")
  expect(() => checkPagesIn(root)).not.toThrow("is not an index naming none")
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
    after: held,
    before: held,
  })
  expect(said).toEqual([])
})
