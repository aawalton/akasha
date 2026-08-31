import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import type { Change } from "../../pages-system/change/change.module.code.ts"
import {
  identitiesTakenFrom,
  idFiled,
  idTakenFrom,
  noneOfTypeFiled,
  pathFiled,
  standingFiled,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { shadowAsked } from "../../pages-system/shadow/shadow.module.code.ts"
import { onDisk } from "../change-walking/change-walking.module.code.ts"
import { checkPagesIn, checksAt, checksIn, checksWoken, judgingBy } from "./checking.module.code.ts"

const CHECK = "code-check"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const MODULE = "module"

const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const MODULE_AT = "akasha/code-system/module/module.page-type.ts"

const MODULE_ID = "01a04bc4-0000-7000-8000-0000000000ff"

const HELD_PAGE_AT = "akasha/held/held.module.ts"

const HELD_CODE_AT = "akasha/held/held.module.code.ts"

const WALKING_AT = new URL("../change-walking/change-walking.module.code.ts", import.meta.url)
  .pathname

const ROOT = join(WALKING_AT, "..", "..", "..", "..")

const HELD = "akasha/checks-system/checking/checking.module"

const SAMPLED: readonly string[] = [
  `${HELD}.code.ts`,
  `${HELD}.ts`,
  "akasha/persona-system/persona/ali/ali.persona.portrait.md",
]

const scratch = scratchWorld()

afterAll(scratch.sweep)

type Stands = {
  readonly slug: string
  readonly at: string
}

const STANDS: Stands = {
  slug: CHECK,
  at: "akasha/checks-system/code-check/code-check.page-type.ts",
}

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
    const at = `akasha/checks-system/code-check/${one.slug}/${one.slug}.${stands.slug}.ts`
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

const WAKES_TS =
  "export function wakesTs(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "ts woke" }))\n' +
  "}\n" +
  'wakesTs.wakesOn = (path) => path.endsWith(".ts")\n'

const WAKES_PAGES =
  `import { PAGES } from "${WALKING_AT}"\n` +
  "export function wakesPages(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "a page woke" }))\n' +
  "}\n" +
  "wakesPages.wakesOn = PAGES.wakesOn\n"

const TWO_CHECKS = [
  { slug: "wakes-ts", runsOn: ["patch"], body: WAKES_TS },
  { slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL },
]

const PAGE_CHECKS = [
  { slug: "wakes-pages", runsOn: ["patch"], body: WAKES_PAGES },
  { slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL },
]

function pagedRoot(): string {
  const root = rootWith(PAGE_CHECKS)
  standingFiled(root, PAGE_TYPE, MODULE, [{ path: MODULE_AT, id: MODULE_ID }])
  mkdirSync(join(root, HELD_PAGE_AT.slice(0, HELD_PAGE_AT.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, HELD_PAGE_AT), `export const held = { slug: "held" }\n`)
  writeFileSync(join(root, HELD_CODE_AT), `export const HELD = "held"\n`)
  return root
}

test("a check is found through the index rather than by walking the tree", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  const found = checksIn(root)
  expect(found.map((one) => one.slug)).toEqual(["admits-all"])
  expect(found[0]?.page).toBe("akasha/checks-system/code-check/admits-all/admits-all.code-check.ts")
})

test("a check is found by the id its page type carries, whatever slug that page type stands under", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }], {
    slug: "gate",
    at: "akasha/gate.page-type.ts",
  })
  expect(checkPagesIn(root)).toEqual([
    "akasha/checks-system/code-check/admits-all/admits-all.gate.ts",
  ])
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
  expect(said[0]?.path).toBe("akasha/checks-system/code-check/throws/throws.code-check.ts")
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
  rmSync(join(root, "akasha/checks-system/code-check/admits-all/admits-all.code-check.code.ts"))
  expect(() => checksIn(root)).toThrow(
    "admits-all.code-check.code.ts is a check's code, and would not load"
  )
})

test("why a check's code would not load is carried into the refusal", () => {
  const root = rootWith([
    { slug: "admits-all", runsOn: ["patch"], body: "export function admitsAll( {\n" },
  ])
  expect(() => checksIn(root)).toThrow("would not load")
  expect(() => checksIn(root)).not.toThrow("answers to nothing that can be run")
})

test("a check page stating no phase a runner can honour is refused", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: [], raw: "", body: ADMITS_ALL }])
  expect(() => checksIn(root)).toThrow("states no phase")
})

test("an index holding no check directory names no check, and refuses what it would leave unjudged", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  identitiesTakenFrom(root, CHECK)
  expect(checkPagesIn(root)).toEqual([])
  expect(() => checksIn(root)).toThrow("the index names no check")
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
  expect(() => checkPagesIn(root)).toThrow("no page carries the id")
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

test("a check whose waking no changed path answers does not run", () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, "one.md"), "one")
  const held = onDisk(root)
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.md"],
    after: held,
    before: held,
  })
  expect(said.map((one) => one.reason)).toEqual(["refused"])
  expect(said.map((one) => one.reason)).not.toContain("ts woke")
})

test("a check carrying no waking runs over a change its woken neighbour sleeps through", () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, "one.md"), "one")
  const every = checksIn(root)
  expect(every.map((one) => `${one.slug} ${one.wakesOn === null}`)).toEqual([
    "refuses-all true",
    "wakes-ts false",
  ])
  const held = onDisk(root)
  const change = { root, changed: ["one.md"], after: held, before: held }
  const woken = checksWoken(every, change, shadowAsked(change))
  expect(woken.map((one) => one.slug)).toEqual(["refuses-all"])
})

test("a check whose waking a changed path answers runs, and judges every path in the change", () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, "two.ts"), "two")
  const held = onDisk(root)
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["two.ts"],
    after: held,
    before: held,
  })
  expect(said.map((one) => one.reason).sort()).toEqual(["refused", "ts woke"])
})

test("a check bounded to the pages sleeps through a change touching a file beside a page alone", () => {
  const root = pagedRoot()
  const held = onDisk(root)
  const change = { root, changed: [HELD_CODE_AT], after: held, before: held }
  expect(judgingBy(checksIn(root)).wokenBy(change)).toEqual(["refuses-all"])
  expect(
    judgingBy(checksIn(root))
      .over(change)
      .map((one) => one.reason)
  ).toEqual(["refused"])
})

test("a check bounded to the pages wakes for a page, its waking having asked the index", () => {
  const root = pagedRoot()
  const held = onDisk(root)
  const change = { root, changed: [HELD_PAGE_AT], after: held, before: held }
  expect(judgingBy(checksIn(root)).wokenBy(change)).toEqual(["refuses-all", "wakes-pages"])
  expect(
    judgingBy(checksIn(root))
      .over(change)
      .map((one) => one.reason)
      .sort()
  ).toEqual(["a page woke", "refused"])
})

test("`wokenBy` names the checks that ran and `named` names every check the gate holds", () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, "one.md"), "one")
  writeFileSync(join(root, "two.ts"), "two")
  const held = onDisk(root)
  const gate = judgingBy(checksIn(root))
  const overMd = { root, changed: ["one.md"], after: held, before: held }
  const overBoth = { root, changed: ["one.md", "two.ts"], after: held, before: held }
  expect(gate.named).toEqual(["refuses-all", "wakes-ts"])
  expect(gate.wokenBy(overMd)).toEqual(["refuses-all"])
  expect(gate.wokenBy(overBoth)).toEqual(["refuses-all", "wakes-ts"])
  expect(gate.over(overMd).map((one) => one.reason)).toEqual(["refused"])
})

function over(changed: readonly string[]): Change {
  const held = onDisk(ROOT)
  return { root: ROOT, changed, after: held, before: held }
}

test("a check refuses nothing in a change its own waking turns away whole", () => {
  const asked = shadowAsked(over(SAMPLED))
  const woken: string[] = []
  for (const one of checksIn(ROOT)) {
    const wakes = one.wakesOn
    if (wakes === null) continue
    const asleep = SAMPLED.filter((path) => !wakes(path, asked))
    if (asleep.length === 0) continue
    woken.push(one.slug)
    const change = over(asleep)
    expect([one.slug, one.run(change, shadowAsked(change))]).toEqual([one.slug, []])
  }
  expect(woken.length).toBeGreaterThan(0)
})
