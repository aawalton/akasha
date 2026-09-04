import { afterAll, expect, test } from "bun:test"
import { rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { indexNamed } from "@akasha/indexes"
import { identitiesTakenFrom, idTakenFrom, indexTakenFrom } from "@akasha/indexes/testing"
import { shadowAsked } from "@akasha/pages-system/shadow"
import { onDisk } from "../change-walking/change-walking.module.code.ts"
import { checkPagesIn, checksAt, checksFor, checksIn, judgingBy } from "./checking.module.code.ts"
import {
  ADMITS,
  ADMITS_ALL,
  BOTH_CHECKS,
  CHECK,
  CHECK_TYPE,
  checkAt,
  checkCodeAt,
  HELD_CODE_AT,
  HELD_PAGE_AT,
  INPUT_THROWS_CHECKS,
  NAMES_SHADOW,
  over,
  pagedRoot,
  REFUSES,
  REFUSES_ALL,
  REFUSES_TAKING,
  ROOT,
  rootWith,
  SAMPLED,
  scratch,
  THROWS,
  THROWS_UNDER,
  TWO_CHECKS,
  taking,
} from "./checking.module.test-fixtures.ts"

const ONE_TS = "akasha/one.ts"

const TWO_TS = "akasha/two.ts"

const ONE_MD = "akasha/one.md"

const GONE_TS = "akasha/gone.ts"

const STAYS_TS = "akasha/stays.ts"

const OUTSIDE_AT = "tools/agent-decide.ts"

const SHAPED = "folder-matches-a-shape"

const WHOLE_TREE_CHECKS_TAKE = 30_000

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

test("a check is run once over the whole change, and never over the rest of the tree", async () => {
  const root = rootWith([{ slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL }])
  writeFileSync(join(root, ONE_TS), "one")
  writeFileSync(join(root, TWO_TS), "two")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [ONE_TS],
    after: held,
    before: held,
  })
  expect(said.map((one) => one.path)).toEqual([ONE_TS])
})

test("a check that threw refuses the change it could not judge, and the refusal names its page", async () => {
  const root = rootWith([{ slug: "throws", runsOn: ["patch"], body: THROWS }])
  writeFileSync(join(root, ONE_TS), "one")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [ONE_TS],
    after: held,
    before: held,
  })
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/checks-system/code-check/throws/throws.code-check.ts")
  expect(said[0]?.reason).toContain("could not look")
  expect(said[0]?.reason).toMatch(
    /^the check `throws` threw at \S+\/throws\.code-check\.code\.ts:2:\d+, so it judged nothing — could not look$/
  )
})

test("a fault raised beneath a check names the file and line it was thrown at, and what called there", async () => {
  const root = rootWith([{ slug: "throws-under", runsOn: ["patch"], body: THROWS_UNDER }])
  writeFileSync(join(root, ONE_TS), "one")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [ONE_TS],
    after: held,
    before: held,
  })
  const why = said[0]?.reason ?? ""
  expect(why).toContain("could not be made")
  expect(why).toMatch(
    /threw at \S+\/throws-under\.code-check\.code\.ts:2:\d+, so it judged nothing/
  )
  expect(why).toMatch(/\(called from 5:\d+, 8:\d+\)$/)
})

test("a path the change takes away is handed to every check, and can be refused", async () => {
  const root = rootWith([{ slug: "refuses-taking", runsOn: ["patch"], body: REFUSES_TAKING }])
  writeFileSync(join(root, STAYS_TS), "stays")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [GONE_TS, STAYS_TS],
    after: held,
    before: held,
  })
  expect(said.map((one) => one.path)).toEqual([GONE_TS])
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

test("the check a change takes away no longer refuses the change taking it", async () => {
  const root = rootWith(BOTH_CHECKS)
  const gate = judgingBy(checksIn(root))
  const change = taking(root, [checkAt(REFUSES), checkCodeAt(REFUSES)])
  expect(gate.named).toEqual([ADMITS, REFUSES])
  expect(gate.checksFor(change)).toEqual([ADMITS])
  expect(await gate.over(change)).toEqual([])
})

test("a check the change leaves still judges the change taking its neighbour away", async () => {
  const root = rootWith(BOTH_CHECKS)
  const gone = [checkAt(ADMITS), checkCodeAt(ADMITS)]
  const gate = judgingBy(checksIn(root))
  expect(gate.checksFor(taking(root, gone))).toEqual([REFUSES])
  expect((await gate.over(taking(root, gone))).map((one) => one.path)).toEqual(gone)
})

test("a check whose code alone the change takes away does not run", () => {
  const root = rootWith(BOTH_CHECKS)
  expect(judgingBy(checksIn(root)).checksFor(taking(root, [checkCodeAt(REFUSES)]))).toEqual([
    ADMITS,
  ])
})

test("a check whose page alone the change takes away does not run", () => {
  const root = rootWith(BOTH_CHECKS)
  expect(judgingBy(checksIn(root)).checksFor(taking(root, [checkAt(REFUSES)]))).toEqual([ADMITS])
})

test("a change taking away every check is refused rather than judged clean", async () => {
  const root = rootWith([{ slug: ADMITS, runsOn: ["patch"], body: ADMITS_ALL }])
  const gone = [checkAt(ADMITS), checkCodeAt(ADMITS)]
  const said = await judgingBy(checksIn(root)).over(taking(root, gone))
  expect(said.map((one) => one.path)).toEqual([checkAt(ADMITS)])
  expect(said[0]?.reason).toContain("takes away every check")
})

test("a check page whose code is not there stops the whole run", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  rmSync(join(root, "akasha/checks-system/code-check/admits-all/admits-all.code-check.code.ts"))
  expect(() => checksIn(root)).toThrow(
    "admits-all.code-check.code.ts is a check's code, and would not load"
  )
})

test("why a check's code would not load is carried into the refusal", async () => {
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

test("an index standing nowhere cannot say which pages are checks, and is not read as naming none", () => {
  const root = rootWith([{ slug: "admits-all", runsOn: ["patch"], body: ADMITS_ALL }])
  indexTakenFrom(root)
  expect(() => checkPagesIn(root)).toThrow(indexNamed())
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

test("one shadow is cast over the change and handed to every check that runs", async () => {
  const root = rootWith([{ slug: "names-shadow", runsOn: ["patch"], body: NAMES_SHADOW }])
  writeFileSync(join(root, ONE_TS), "one")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [ONE_TS],
    after: held,
    before: held,
  })
  expect(said).toEqual([])
})

test("a check no changed path is input to does not run", async () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, ONE_MD), "one")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [ONE_MD],
    after: held,
    before: held,
  })
  expect(said.map((one) => one.reason)).toEqual(["refused"])
  expect(said.map((one) => one.reason)).not.toContain("ts woke")
})

test("a check stating no input runs over a change its neighbour sleeps through", () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, ONE_MD), "one")
  const every = checksIn(root)
  expect(every.map((one) => `${one.slug} ${one.isInput === null}`)).toEqual([
    "input-ts false",
    "refuses-all true",
  ])
  const held = onDisk(root)
  const change = { root, changed: [ONE_MD], after: held, before: held }
  const taken = checksFor(every, change, shadowAsked(change))
  expect(taken.map((one) => one.slug)).toEqual(["refuses-all"])
})

test("a check whose input could not be answered runs, its neighbour taken as it would have been", async () => {
  const root = rootWith(INPUT_THROWS_CHECKS)
  writeFileSync(join(root, ONE_MD), "one")
  writeFileSync(join(root, TWO_TS), "two")
  const every = checksIn(root)
  const held = onDisk(root)
  const overMd = { root, changed: [ONE_MD], after: held, before: held }
  const overTs = { root, changed: [TWO_TS], after: held, before: held }
  expect(checksFor(every, overMd, shadowAsked(overMd)).map((one) => one.slug)).toEqual([
    "input-throws",
  ])
  expect(checksFor(every, overTs, shadowAsked(overTs)).map((one) => one.slug)).toEqual([
    "input-throws",
    "input-ts",
  ])
  expect((await judgingBy(every).over(overMd)).map((one) => one.reason)).toEqual(["woke anyway"])
})

test("a check a changed path is input to runs, and judges every path in the change", async () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, TWO_TS), "two")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [TWO_TS],
    after: held,
    before: held,
  })
  expect(said.map((one) => one.reason).sort()).toEqual(["refused", "ts woke"])
})

test("a check bounded to the pages sleeps through a change touching a file beside a page alone", async () => {
  const root = pagedRoot()
  const held = onDisk(root)
  const change = { root, changed: [HELD_CODE_AT], after: held, before: held }
  expect(judgingBy(checksIn(root)).checksFor(change)).toEqual(["refuses-all"])
  expect((await judgingBy(checksIn(root)).over(change)).map((one) => one.reason)).toEqual([
    "refused",
  ])
})

test("a page is input to a check bounded to the pages, its input having asked the index", async () => {
  const root = pagedRoot()
  const held = onDisk(root)
  const change = { root, changed: [HELD_PAGE_AT], after: held, before: held }
  expect(judgingBy(checksIn(root)).checksFor(change)).toEqual(["input-pages", "refuses-all"])
  expect((await judgingBy(checksIn(root)).over(change)).map((one) => one.reason).sort()).toEqual([
    "a page woke",
    "refused",
  ])
})

test("`checksFor` names the checks that ran and `named` names every check the gate holds", async () => {
  const root = rootWith(TWO_CHECKS)
  writeFileSync(join(root, ONE_MD), "one")
  writeFileSync(join(root, TWO_TS), "two")
  const held = onDisk(root)
  const gate = judgingBy(checksIn(root))
  const overMd = { root, changed: [ONE_MD], after: held, before: held }
  const overBoth = { root, changed: [ONE_MD, TWO_TS], after: held, before: held }
  expect(gate.named).toEqual(["input-ts", "refuses-all"])
  expect(gate.checksFor(overMd)).toEqual(["refuses-all"])
  expect(gate.checksFor(overBoth)).toEqual(["input-ts", "refuses-all"])
  expect((await gate.over(overMd)).map((one) => one.reason)).toEqual(["refused"])
})

test("a path outside the akasha folder is passed over rather than refused", async () => {
  const root = rootWith([{ slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL }])
  writeFileSync(join(root, ONE_TS), "one")
  const held = onDisk(root)
  const said = await judgingBy(checksIn(root)).over({
    root,
    changed: [ONE_TS, OUTSIDE_AT],
    after: held,
    before: held,
  })
  expect(said.map((one) => one.path)).toEqual([ONE_TS])
})

test(
  "a check refuses nothing in a change its own input turns away whole",
  async () => {
    const asked = shadowAsked(over(SAMPLED))
    const taken: string[] = []
    for (const one of checksIn(ROOT)) {
      const takes = one.isInput
      if (takes === null) continue
      const asleep = SAMPLED.filter((path) => !takes(path, asked))
      if (asleep.length === 0) continue
      taken.push(one.slug)
      const change = over(asleep)
      expect([one.slug, await one.run(change, shadowAsked(change))]).toEqual([one.slug, []])
    }
    expect(taken.length).toBeGreaterThan(0)
  },
  WHOLE_TREE_CHECKS_TAKE
)

test("a check carrying no guard of its own takes no path outside the akasha folder", async () => {
  const gate = judgingBy(checksIn(ROOT).filter((one) => one.slug === SHAPED))
  expect(gate.named).toEqual([SHAPED])
  expect(gate.checksFor(over([OUTSIDE_AT]))).toEqual([])
  expect(await gate.over(over([OUTSIDE_AT]))).toEqual([])
  expect(gate.checksFor(over(SAMPLED))).toEqual([SHAPED])
})
