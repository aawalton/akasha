import { afterAll, expect, test } from "bun:test"
import { rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Change } from "../../pages-system/change/change.module.code.ts"
import {
  identitiesTakenFrom,
  idTakenFrom,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { shadowAsked } from "../../pages-system/shadow/shadow.module.code.ts"
import { onDisk } from "../change-walking/change-walking.module.code.ts"
import { checkPagesIn, checksAt, checksFor, checksIn, judgingBy } from "./checking.module.code.ts"
import {
  ADMITS_ALL,
  CHECK,
  CHECK_TYPE,
  HELD_CODE_AT,
  HELD_PAGE_AT,
  NAMES_SHADOW,
  pagedRoot,
  REFUSES_ALL,
  REFUSES_TAKING,
  ROOT,
  rootWith,
  SAMPLED,
  scratch,
  THROWS,
  TWO_CHECKS,
  WAKING_THROWS_CHECKS,
} from "./checking.module.test-fixtures.ts"

const PAGE = "page"

afterAll(scratch.sweep)

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
  expect(every.map((one) => `${one.slug} ${one.isInput === null}`)).toEqual([
    "refuses-all true",
    "wakes-ts false",
  ])
  const held = onDisk(root)
  const change = { root, changed: ["one.md"], after: held, before: held }
  const woken = checksFor(every, change, shadowAsked(change))
  expect(woken.map((one) => one.slug)).toEqual(["refuses-all"])
})

test("a check whose waking could not answer runs, its neighbour woken as it would have been", () => {
  const root = rootWith(WAKING_THROWS_CHECKS)
  writeFileSync(join(root, "one.md"), "one")
  writeFileSync(join(root, "two.ts"), "two")
  const every = checksIn(root)
  const held = onDisk(root)
  const overMd = { root, changed: ["one.md"], after: held, before: held }
  const overTs = { root, changed: ["two.ts"], after: held, before: held }
  expect(checksFor(every, overMd, shadowAsked(overMd)).map((one) => one.slug)).toEqual([
    "waking-throws",
  ])
  expect(checksFor(every, overTs, shadowAsked(overTs)).map((one) => one.slug)).toEqual([
    "wakes-ts",
    "waking-throws",
  ])
  expect(
    judgingBy(every)
      .over(overMd)
      .map((one) => one.reason)
  ).toEqual(["woke anyway"])
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
    const wakes = one.isInput
    if (wakes === null) continue
    const asleep = SAMPLED.filter((path) => !wakes(path, asked))
    if (asleep.length === 0) continue
    woken.push(one.slug)
    const change = over(asleep)
    expect([one.slug, one.run(change, shadowAsked(change))]).toEqual([one.slug, []])
  }
  expect(woken.length).toBeGreaterThan(0)
})
