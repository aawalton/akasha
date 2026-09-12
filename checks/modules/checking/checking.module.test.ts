import { afterAll, expect, test } from "bun:test"
import {
  checkPagesIn,
  checksAt,
  checksFor,
  checksIn,
  judgingBy,
  ranOver,
} from "akasha/checks/modules/checking/checking.module.code.ts"
import {
  ADMITS,
  ADMITS_CHECK,
  AUDITS_CHECK,
  AUDITS_REFUSING,
  BOTH_CHECKS,
  BURNS,
  BURNS_AT_AUDIT,
  BURNS_AT_DEPLOY,
  BURNS_CHECK,
  CHECK_TYPE,
  checkAt,
  checkCodeAt,
  checksTakenFrom,
  costing,
  EXPERIMENTAL_CHECKS,
  everyIn,
  GATHERED,
  GONE_TS,
  gateTaking,
  HELD_CODE_AT,
  HELD_PAGE_AT,
  INPUT_THROWS_CHECKS,
  judgedAsleep,
  judgedIn,
  judgedOver,
  leftTaking,
  NO_PHASE_CHECK,
  ONE_MD,
  ONE_TS,
  overIn,
  PHASE_CHECKS,
  pagedRoot,
  REFUSES,
  REFUSES_CHECK,
  rootHolding,
  rootWith,
  SHADOW_CHECK,
  SLEEPING_CHECK,
  STAYS_TS,
  scratch,
  TAKING_CHECK,
  THROWS_CHECK,
  THROWS_UNDER_CHECK,
  TWO_CHECKS,
  TWO_TS,
  taking,
  UNLOADABLE_CHECK,
  WHOLE_TREE_CHECKS_TAKE,
} from "akasha/checks/modules/checking/checking.module.test-fixtures.ts"
import { indexNamed } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  idTakenFrom,
  indexTakenFrom,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a check is found through the index rather than by walking the tree", () => {
  const root = rootWith(ADMITS_CHECK)
  const found = checksIn(root)
  expect(found.map((one) => one.slug)).toEqual(["admits-all"])
  expect(found[0]?.page).toBe("akasha/checks-system/code-check/admits-all/admits-all.code-check.ts")
})

test("a check is found by the id its page type carries, whatever slug that page type stands under", () => {
  const root = rootWith(ADMITS_CHECK, { slug: "gate", at: "akasha/gate.page-type.ts" })
  expect(checkPagesIn(root)).toEqual([
    "akasha/checks-system/code-check/admits-all/admits-all.gate.ts",
  ])
  expect(checksIn(root).map((one) => one.slug)).toEqual(["admits-all"])
})

test("a check is run once over the whole change, and never over the rest of the tree", async () => {
  const said = await judgedIn(REFUSES_CHECK, [ONE_TS, TWO_TS], [ONE_TS])
  expect(said.map((one) => one.path)).toEqual([ONE_TS])
})

test("a check that threw refuses the change it could not judge, and the refusal names its page", async () => {
  const said = await judgedIn(THROWS_CHECK, [ONE_TS], [ONE_TS])
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/checks-system/code-check/throws/throws.code-check.ts")
  expect(said[0]?.reason).toContain("could not look")
  expect(said[0]?.reason).toMatch(
    /^the check `throws` threw at \S+\/throws\.code-check\.code\.ts:2:\d+, so it judged nothing — could not look$/
  )
})

test("a fault raised beneath a check names the file and line it was thrown at, and what called there", async () => {
  const said = await judgedIn(THROWS_UNDER_CHECK, [ONE_TS], [ONE_TS])
  const why = said[0]?.reason ?? ""
  expect(why).toContain("could not be made")
  expect(why).toMatch(
    /threw at \S+\/throws-under\.code-check\.code\.ts:2:\d+, so it judged nothing/
  )
  expect(why).toMatch(/\(called from 5:\d+, 8:\d+\)$/)
})

test("a path the change takes away is handed to every check, and can be refused", async () => {
  const said = await judgedIn(TAKING_CHECK, [STAYS_TS], [GONE_TS, STAYS_TS])
  expect(said.map((one) => one.path)).toEqual([GONE_TS])
  expect(said[0]?.reason).toContain("may not be taken away")
})

test("a phase takes only the checks that state it", () => {
  const every = everyIn(PHASE_CHECKS)
  expect(checksAt(every, "change").map((one) => one.slug)).toEqual(["admits-all"])
  expect(checksAt(every, "deploy").map((one) => one.slug)).toEqual(["refuses-all"])
  expect(checksAt(every, "worktree")).toEqual([])
})

test("a check saying it is experimental is left out of every phase its page states", () => {
  const every = everyIn(EXPERIMENTAL_CHECKS)
  expect(every.map((one) => one.runsOn)).toEqual([[], ["change"]])
  expect(checksAt(every, "change").map((one) => one.slug)).toEqual([REFUSES])
  expect(checksAt(every, "audit")).toEqual([])
})

test("the check a change takes away no longer refuses the change taking it", async () => {
  const { gate, change } = gateTaking([checkAt(REFUSES), checkCodeAt(REFUSES)])
  expect(gate.named).toEqual([ADMITS, REFUSES])
  expect(gate.checksFor(change)).toEqual([ADMITS])
  expect(await gate.over(change)).toEqual([])
})

test("a check the change leaves still judges the change taking its neighbour away", async () => {
  const { gate, change } = gateTaking([checkAt(ADMITS), checkCodeAt(ADMITS)])
  expect(gate.checksFor(change)).toEqual([REFUSES])
  expect((await gate.over(change)).map((one) => one.path)).toEqual([...change.changed])
})

test("a check whose code alone the change takes away does not run", () => {
  expect(leftTaking([checkCodeAt(REFUSES)])).toEqual([ADMITS])
})

test("a check whose page alone the change takes away does not run", () => {
  expect(leftTaking([checkAt(REFUSES)])).toEqual([ADMITS])
})

test("a change taking away every check is refused rather than judged clean", async () => {
  const root = rootWith(ADMITS_CHECK)
  const gone = [checkAt(ADMITS), checkCodeAt(ADMITS)]
  const said = await judgingBy(checksIn(root), "change").over(taking(root, gone))
  expect(said.map((one) => one.path)).toEqual([checkAt(ADMITS)])
  expect(said[0]?.reason).toContain("takes away every check")
})

test("a check whose code is not there refuses from itself, its neighbour judging on", async () => {
  const one = await judgedOver(BOTH_CHECKS, ADMITS)
  expect(one.slugs).toEqual([ADMITS, REFUSES])
  expect(one.reasons).toContain("refused")
  expect(one.broke.map((two) => two.path)).toEqual([checkAt(ADMITS)])
  expect(one.broke[0]?.reason).toContain("no code sits beside that page")
})

test("why a check's code would not load is carried into its own refusal", async () => {
  const one = await judgedOver(UNLOADABLE_CHECK)
  expect(one.slugs).toEqual([ADMITS, REFUSES])
  expect(one.reasons).toContain("refused")
  expect(one.broke[0]?.reason).toContain("would not load")
})

test("a check page stating no phase a runner can honour refuses from itself", async () => {
  const one = await judgedOver(NO_PHASE_CHECK)
  expect(one.reasons).toContain("refused")
  expect(one.broke[0]?.reason).toContain("states no phase")
})

test("an index holding no check directory names no check, and refuses what it would leave unjudged", () => {
  const root = rootWith(ADMITS_CHECK)
  checksTakenFrom(root, ADMITS)
  expect(checkPagesIn(root)).toEqual([])
  expect(() => checksIn(root)).toThrow("the index names no check")
})

test("an index standing nowhere cannot say which pages are checks, and is not read as naming none", () => {
  const root = rootWith(ADMITS_CHECK)
  indexTakenFrom(root)
  expect(() => checkPagesIn(root)).toThrow(indexNamed())
  expect(() => checksIn(root)).toThrow("is not an index naming none")
})

test("an id directory standing but carrying no check page type answers as absent rather than as missing", () => {
  const root = rootWith(ADMITS_CHECK)
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
  const every = everyIn(SLEEPING_CHECK)
  expect(every.map((one) => one.slug)).toEqual(["admits-all"])
  expect(judgingBy(checksAt(every, "change"), "change").named).toEqual([])
})

test("a check handed a root is run at audit by the audit beside it rather than over the change", async () => {
  const root = rootHolding(AUDITS_CHECK, [ONE_TS])
  const gate = judgingBy(checksAt(checksIn(root), "audit"), "audit", root)
  const said = await gate.over(overIn(root, [ONE_TS]))
  expect(said.map((one) => one.reason)).toEqual([root])
})

test("a check handed no root is run over the change though an audit sits beside it", async () => {
  const root = rootHolding(AUDITS_REFUSING, [ONE_TS])
  const gate = judgingBy(checksAt(checksIn(root), "audit"), "audit")
  const said = await gate.over(overIn(root, [ONE_TS]))
  expect(said.map((one) => one.reason)).toEqual(["refused"])
})

test("one shadow is cast over the change and handed to every check that runs", async () => {
  const said = await judgedIn(SHADOW_CHECK, [ONE_TS], [ONE_TS])
  expect(said).toEqual([])
})

test("a check no changed path is input to does not run", async () => {
  const said = await judgedIn(TWO_CHECKS, [ONE_MD], [ONE_MD])
  expect(said.map((one) => one.reason)).toEqual(["refused"])
  expect(said.map((one) => one.reason)).not.toContain("ts woke")
})

test("a check stating no input runs over a change its neighbour sleeps through", () => {
  const root = rootHolding(TWO_CHECKS, [ONE_MD])
  const every = checksIn(root)
  expect(every.map((one) => `${one.slug} ${one.isInput === null}`)).toEqual([
    "input-ts false",
    "refuses-all true",
  ])
  const change = overIn(root, [ONE_MD])
  const taken = checksFor(every, change, shadowAsked(change))
  expect(taken.map((one) => one.slug)).toEqual(["refuses-all"])
})

test("a check whose input could not be answered runs, its neighbour taken as it would have been", async () => {
  const root = rootHolding(INPUT_THROWS_CHECKS, [ONE_MD, TWO_TS])
  const every = checksIn(root)
  const overMd = overIn(root, [ONE_MD])
  const overTs = overIn(root, [TWO_TS])
  expect(checksFor(every, overMd, shadowAsked(overMd)).map((one) => one.slug)).toEqual([
    "input-throws",
  ])
  expect(checksFor(every, overTs, shadowAsked(overTs)).map((one) => one.slug)).toEqual([
    "input-throws",
    "input-ts",
  ])
  expect((await judgingBy(every, "change").over(overMd)).map((one) => one.reason)).toEqual([
    "woke anyway",
  ])
})

test("a check a changed path is input to runs, and judges every path in the change", async () => {
  const said = await judgedIn(TWO_CHECKS, [TWO_TS], [TWO_TS])
  expect(said.map((one) => one.reason).sort()).toEqual(["refused", "ts woke"])
})

test("a check bounded to the pages sleeps through a change touching a file beside a page alone", async () => {
  const root = pagedRoot()
  const change = overIn(root, [HELD_CODE_AT])
  expect(judgingBy(checksIn(root), "change").checksFor(change)).toEqual(["refuses-all"])
  const said = await judgingBy(checksIn(root), "change").over(change)
  expect(said.map((one) => one.reason)).toEqual(["refused"])
})

test("a page is input to a check bounded to the pages, its input having asked the index", async () => {
  const root = pagedRoot()
  const change = overIn(root, [HELD_PAGE_AT])
  expect(judgingBy(checksIn(root), "change").checksFor(change)).toEqual([
    "input-pages",
    "refuses-all",
  ])
  expect(
    (await judgingBy(checksIn(root), "change").over(change)).map((one) => one.reason).sort()
  ).toEqual(["a page woke", "refused"])
})

test("`checksFor` names the checks that ran and `named` names every check the gate holds", async () => {
  const root = rootHolding(TWO_CHECKS, [ONE_MD, TWO_TS])
  const gate = judgingBy(checksIn(root), "change")
  const overMd = overIn(root, [ONE_MD])
  const overBoth = overIn(root, [ONE_MD, TWO_TS])
  expect(gate.named).toEqual(["input-ts", "refuses-all"])
  expect(gate.checksFor(overMd)).toEqual(["refuses-all"])
  expect(gate.checksFor(overBoth)).toEqual(["input-ts", "refuses-all"])
  expect((await gate.over(overMd)).map((one) => one.reason)).toEqual(["refused"])
})

test("a check that ran is named on a list the caller hands in", async () => {
  const root = rootHolding(TWO_CHECKS, [ONE_MD, TWO_TS])
  const done: string[] = []
  await judgingBy(checksIn(root), "change").over(overIn(root, [ONE_MD, TWO_TS]), done)
  expect(done).toEqual(["input-ts", "refuses-all"])
})

test("a check over its ceiling refuses, and the refusal names the check's own page", async () => {
  const said = await judgedIn(BURNS_CHECK, [ONE_TS], [ONE_TS])
  expect(said.map((one) => one.path)).toEqual([checkAt(BURNS)])
  expect(said[0]?.reason).toContain("over the 0 its page states, so what it judged does not land")
})

test("a check over its ceiling at deploy refuses by its check group", async () => {
  const said = await judgedIn(BURNS_AT_DEPLOY, [ONE_TS], [ONE_TS], "deploy")
  expect(said[0]?.reason).toContain("over the 0 its page states")
})

test("a check at its ceiling refuses nothing, and one over it names its own page", () => {
  const one = { ...GATHERED, checkCeiling: 1 }
  expect(ranOver(one, "check", costing(0.6, 0.4))).toBe(null)
  const said = ranOver(one, "check", costing(1.2, 0))
  expect(said?.path).toBe(checkAt(BURNS))
  expect(said?.reason).toContain("spent 1.2 processor seconds judging this change, over the 1")
})

test("the time counted is the check's own together with what the check spawns", () => {
  const one = { ...GATHERED, checkCeiling: 1 }
  expect(ranOver(one, "check", costing(0.9, 0.05))).toBe(null)
  expect(ranOver(one, "check", costing(0.05, 1.5))?.reason).toContain("spent 1.55 processor")
})

test("a group stating no ceiling refuses nothing however long its check runs", () => {
  expect(ranOver(GATHERED, "check", costing(600, 600))).toBe(null)
  expect(ranOver({ ...GATHERED, checkCeiling: null }, "check", costing(600, 600))).toBe(null)
})

test("the group whose code ran decides which group states the ceiling", () => {
  const one = { ...GATHERED, checkCeiling: 9, auditCeiling: 1 }
  expect(ranOver(one, "check", costing(2, 0))).toBe(null)
  expect(ranOver(one, "audit", costing(2, 0))?.reason).toContain("over the 1 its page states")
})

test("a run over some of the files is held by the check group though its phase is audit", async () => {
  const root = rootHolding(BURNS_AT_AUDIT, [ONE_TS])
  expect(await judgingBy(checksIn(root), "audit", root).over(overIn(root, [ONE_TS]))).toEqual([])
  const some = await judgingBy(checksIn(root), "audit").over(overIn(root, [ONE_TS]))
  expect(some[0]?.reason).toContain("over the 0 its page states")
})

test(
  "a check that judges refuses nothing in a change its own input turns away whole",
  async () => {
    const said = await judgedAsleep()
    expect(said.length).toBeGreaterThan(0)
    expect(said.filter((one) => one[1].length > 0)).toEqual([])
  },
  WHOLE_TREE_CHECKS_TAKE
)
