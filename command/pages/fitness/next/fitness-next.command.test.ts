import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  coveredBy,
  type Kit,
} from "akasha/command/pages/fitness/modules/kit-loading/kit-loading.module.code.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  chosenFor,
  climbOf,
  fitnessNext,
  loadable,
  newnessLeftIn,
  type Offer,
  offerOf,
  outIn,
  owedIn,
  repsAt,
  restrictedIn,
  saidOf,
  todayIn,
} from "akasha/command/pages/fitness/next/fitness-next.command.code.ts"
import {
  BENCH,
  BOUNDS,
  bounds,
  COVERED,
  FREE,
  GIVEN,
  KIT,
  KNOWN,
  mark,
  next,
  OFFER,
  ROOM,
  WARM,
  week,
} from "akasha/command/pages/fitness/next/fitness-next.command.test-fixtures.ts"
import type { Mark } from "akasha/command/pages/fitness/next/modules/marking/marking.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const spoken = (offer: Offer | null): readonly string[] => saidOf(next({ offer }))

test("a movement of the body alone is loadable with no kit at all", () => {
  expect(loadable(movement("pushups", { implement: "body-only" }), new Set())).toBe(true)
})

test("a movement naming kit Alan does not own is not loadable", () => {
  expect(loadable(movement("barbell-bench", { implement: "barbell" }), COVERED)).toBe(false)
})

test("a stretch is no movement to rank", () => {
  expect(loadable(movement("hamstring-stretch", { category: "stretching" }), COVERED)).toBe(false)
})

test("the muscle owed the most comes first", () => {
  const took = new Map([
    ["chest", 5],
    ["calves", 1],
  ])
  const owed = owedIn(took, 6)
  expect(owed.indexOf("calves")).toBeLessThan(owed.indexOf("chest"))
})

test("a muscle at its floor is owed nothing", () => {
  expect(owedIn(new Map([["chest", 6]]), 6)).not.toContain("chest")
})

test("the first movement of a bout is one Alan has taken near failure before", () => {
  const fresh = movement("incline-dumbbell-press")
  const chosen = chosenFor(week([BENCH, fresh]), "chest", COVERED, KNOWN, BOUNDS, FREE)
  expect(chosen?.slug).toBe("dumbbell-bench-press")
})

test("a movement new to Alan is offered only once Alan has worked today", () => {
  const fresh = movement("incline-dumbbell-press")
  const chosen = chosenFor(week([fresh]), "chest", COVERED, new Map(), BOUNDS, FREE)
  expect(chosen).toBe(null)
  const room = bounds({ newnessLeft: 1 })
  expect(chosenFor(week([fresh]), "chest", COVERED, new Map(), room, FREE)?.slug).toBe(
    "incline-dumbbell-press"
  )
})

test("a movement every muscle of which is at its ceiling is out", () => {
  const took = new Map([["chest", 12]])
  expect(chosenFor(week([BENCH], took), "chest", COVERED, KNOWN, BOUNDS, FREE)).toBe(null)
})

test("a bout that has taken its new movement takes no more", () => {
  expect(
    newnessLeftIn(["a", "a"], new Map([["a", mark({ sets: 2, weight: null, reps: null })]]), 1)
  ).toBe(0)
})

test("a bout not begun allows nothing new", () => {
  expect(newnessLeftIn([], new Map(), 1)).toBe(0)
})

test("a movement offered carries the weight used and one rep past the best", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, ROOM, FREE)
  expect(offer?.weight).toBe(30)
  expect(offer?.reps).toBe(21)
})

test("a movement at the top of its kit says the weight holds", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, ROOM, FREE, WARM)
  expect(offer?.atKitCeiling).toBe(true)
  expect(spoken(offer).some((one) => one.includes("tops out"))).toBe(true)
})

test("a movement the kit cannot load further is made harder by slowing the rep", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, BOUNDS, FREE, WARM)
  expect(offer?.reps).toBe(20)
  expect(offer?.slower).toBe(true)
  expect(spoken(offer).some((one) => one.includes("lower slowly"))).toBe(true)
})

const EVERY: readonly Kit[] = [{ covers: ["dumbbell", "barbell"], loads: [], step: 5 }]

const BARBELL = movement("barbell-bench-press", { implement: "barbell" })

test("at a gym holding every implement, every movement is loadable", () => {
  expect(loadable(BARBELL, COVERED)).toBe(false)
  expect(loadable(BARBELL, coveredBy(EVERY))).toBe(true)
  const known = new Map<string, Mark>([["barbell-bench-press", mark()]])
  expect(offerOf(week([BARBELL]), EVERY, known, BOUNDS, FREE, WARM)?.movement).toBe(
    "barbell-bench-press"
  )
})

test("at a gym holding every implement, no weight is held at a ceiling", () => {
  const offer = offerOf(week([BENCH]), EVERY, KNOWN, BOUNDS, FREE, WARM)
  expect(offer?.atKitCeiling).toBe(false)
  expect(offer?.slower).toBe(false)
})

test("a best at the reps before slowing steps up a load where the gym has one", () => {
  const offer = offerOf(week([BENCH]), EVERY, KNOWN, BOUNDS, FREE, WARM)
  expect(offer?.weight).toBe(35)
  expect(offer?.reps).toBe(12)
  expect(spoken(offer)[1]).toBe("  35 lb, 12 reps")
})

test("a best at the reps before slowing steps up to the next load a gym lists", () => {
  const rack: readonly Kit[] = [{ covers: ["dumbbell"], loads: [10, 20, 30, 40, 50] }]
  const offer = offerOf(week([BENCH]), rack, KNOWN, BOUNDS, FREE, WARM)
  expect(offer?.weight).toBe(40)
  expect(offer?.reps).toBe(7)
  expect(offer?.atKitCeiling).toBe(false)
})

test("a best at home's top load holds its weight and climbs its reps", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, ROOM, FREE, WARM)
  expect(offer?.weight).toBe(30)
  expect(offer?.reps).toBe(21)
  expect(offer?.atKitCeiling).toBe(true)
})

test("the reps at a weight stepped up are what the Epley relation gives from the best", () => {
  expect(repsAt(30, 20, 35)).toBe(12)
  expect(repsAt(30, 20, 40)).toBe(7)
  expect(repsAt(30, 20, 50)).toBe(1)
  expect(repsAt(10, 1, 50)).toBe(1)
})

test("a movement of the body alone never steps up a load", () => {
  const pushups = movement("pushups", { implement: "body-only" })
  const known = new Map<string, Mark>([["pushups", mark({ weight: 30, reps: 25 })]])
  const every: readonly Kit[] = [{ covers: ["body-only"], loads: [], step: 5 }]
  const offer = offerOf(week([pushups]), every, known, BOUNDS, FREE, WARM)
  expect(offer?.weight).toBe(30)
  expect(offer?.reps).toBe(26)
})

test("a best Alan took at another gym sets the weight and reps at this one", () => {
  const offer = offerOf(week([BENCH]), EVERY, KNOWN, ROOM, FREE, WARM)
  expect(offer?.weight).toBe(30)
  expect(offer?.reps).toBe(21)
})

const SQUAT = movement("dumbbell-squat", { muscles: ["quadriceps"], pattern: "squat" })

const HOTEL_BEST = mark({
  weight: 40,
  reps: 10,
  byLoad: new Map([
    [40, 10],
    [30, 14],
  ]),
})

test("a best heavier than the kit at home holds is offered at the heaviest load home holds", () => {
  const known = new Map<string, Mark>([["dumbbell-squat", HOTEL_BEST]])
  const offer = offerOf(week([SQUAT]), KIT, known, BOUNDS, FREE, WARM)
  expect(offer?.weight).toBe(30)
  expect(offer?.reps).toBe(15)
  expect(offer?.atKitCeiling).toBe(true)
})

test("a capped weight Alan never logged holds the reps of his best", () => {
  const known = new Map<string, Mark>([
    ["dumbbell-squat", mark({ weight: 40, reps: 10, byLoad: new Map([[40, 10]]) })],
  ])
  const offer = offerOf(week([SQUAT]), KIT, known, BOUNDS, FREE, WARM)
  expect(offer?.weight).toBe(30)
  expect(offer?.reps).toBe(10)
  expect(offer?.atKitCeiling).toBe(true)
})

test("a gym holding every implement offers the best weight uncapped", () => {
  const known = new Map<string, Mark>([["dumbbell-squat", HOTEL_BEST]])
  const offer = offerOf(week([SQUAT]), EVERY, known, BOUNDS, FREE, WARM)
  expect(offer?.weight).toBe(40)
  expect(offer?.reps).toBe(11)
  expect(offer?.atKitCeiling).toBe(false)
})

test("reps climb while the kit can still load the movement", () => {
  expect(climbOf(mark({ reps: 30 }), false, 20)).toEqual({ reps: 31, slower: false })
})

test("a movement Alan never took near failure carries no weight and no reps", () => {
  const fresh = movement("incline-dumbbell-press")
  const offer = offerOf(week([fresh]), KIT, new Map(), bounds({ newnessLeft: 1 }), FREE)
  expect(offer?.weight).toBe(null)
  expect(offer?.reps).toBe(null)
})

const CURL = movement("hammer-curls", { muscles: ["biceps"], pattern: "isolation-other" })

const BOTH = new Map<string, Mark>([
  ["dumbbell-bench-press", mark({ sets: 16 })],
  ["hammer-curls", mark({ sets: 5, weight: 15, reps: 15 })],
])

test("muscles owed alike are parted by the deepest history", () => {
  const offer = offerOf(week([BENCH, CURL]), KIT, BOTH, BOUNDS, FREE)
  expect(offer?.movement).toBe("dumbbell-bench-press")
})

test("a restriction names the pattern it keeps out", () => {
  expect(restrictedIn([{ movementPattern: "v-push" }, {}])).toEqual(new Set(["v-push"]))
})

test("a movement Alan may not perform is gone before any movement is ranked", () => {
  const two = week([BENCH, CURL])
  const out = outIn(two.movements, new Set(["h-push"]), new Set())
  expect(offerOf(two, KIT, BOTH, BOUNDS, out)?.movement).toBe("hammer-curls")
})

test("a movement turned down before today is ranked below one never turned down", () => {
  const two = week([BENCH, CURL])
  const turned = new Map<string, Mark>([
    ["dumbbell-bench-press", mark({ sets: 16, turns: 16 })],
    ["hammer-curls", mark({ sets: 5, weight: 15, reps: 15 })],
  ])
  expect(offerOf(two, KIT, turned, BOUNDS, FREE)?.movement).toBe("hammer-curls")
})

test("a cold Alan is put on the raise rather than on the work behind it", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, BOUNDS, FREE)
  expect(offer?.step.kind).toBe("raise")
  expect(spoken(offer)).toEqual(["5 minutes easy, until you are breathing and damp"])
})

test("an Alan warm inside the window puts Alan on the working set", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, BOUNDS, FREE, WARM)
  expect(offer?.step.kind).toBe("work")
  expect(spoken(offer)[0]).toBe(BENCH.slug)
  expect(spoken(offer)[1]).toBe("  30 lb, 20 reps")
})

test("no ramp comes between the warmup and the working set", () => {
  for (const warmth of [WARM, undefined]) {
    const offer = offerOf(week([BENCH]), KIT, KNOWN, BOUNDS, FREE, warmth)
    expect(offer?.step.kind).not.toBe("ramp")
  }
})

test("what a muscle is owed is weighed and never said", () => {
  expect(spoken(OFFER)).toEqual(["Dumbbell Bench Press", "  30 lb, 20 reps"])
})

test("nothing owed and nothing loadable is answered as rest", () => {
  expect(spoken(null)[0]).toContain("rest")
})

test("a day that has moved its target is answered with a cool down and no more work", () => {
  const cooling = next({
    cooling: true,
    cool: { movement: "all-fours-quad-stretch", title: "All Fours Quad Stretch", seconds: 45 },
    lifted: 3012,
    offer: OFFER,
  })
  expect(saidOf(cooling)).toEqual([
    "3012 lb moved today, against a target of 3000 lb — that is the day's work",
    "All Fours Quad Stretch",
    "  hold 45 seconds",
  ])
})

test("a cool down Alan has finished still says what the day asked", () => {
  const done = saidOf(next({ cooling: true, lifted: 3200 }))
  expect(done[0]).toContain("3200 lb moved today")
  expect(done[1]).toContain("cooled down")
})

const LEGS = movement("goblet-squat", {
  muscles: ["quadriceps"],
  pattern: "squat",
  focus: "legs",
})

const CRUNCH = movement("crunch", {
  muscles: ["abdominals"],
  pattern: "isolation-other",
  implement: "body-only",
  focus: "core",
})

const OWED = new Map<string, Mark>([
  ["dumbbell-bench-press", mark()],
  ["goblet-squat", mark({ weight: 20 })],
  ["crunch", mark({ weight: null })],
])

test("a movement outside the day's focus is gone before any movement is ranked", () => {
  const three = week([BENCH, LEGS, CRUNCH], new Map([["abdominals", 6]]))
  expect(offerOf(three, KIT, OWED, BOUNDS, FREE, WARM, "legs")?.movement).toBe("goblet-squat")
  expect(offerOf(three, KIT, OWED, BOUNDS, FREE, WARM, "push")?.movement).toBe(
    "dumbbell-bench-press"
  )
})

test("a day no schedule names leaves every movement in", () => {
  const two = week([BENCH, LEGS], new Map([["chest", 5]]))
  expect(offerOf(two, KIT, OWED, BOUNDS, FREE, WARM)?.movement).toBe("goblet-squat")
})

test("a movement of the core is offered whatever the day trains", () => {
  const two = week([LEGS, CRUNCH])
  expect(offerOf(two, KIT, OWED, BOUNDS, FREE, WARM, "push")?.movement).toBe("crunch")
})

test("a day whose focus is rest is answered as rest", () => {
  expect(saidOf(next({ resting: true }))[0]).toContain("rest day")
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

function sleptBefore(day: string, sleep: { startedAt: string; endedAt: string }): string {
  const root = scratch.rootFor("fitness-next-today-")
  const at = `akasha/held/${day}/day-${day}.day.ts`
  listedFiled(root, "day", `day-${day}`, [{ path: at, id: `id-${day}` }])
  mkdirSync(dirname(join(root, at)), { recursive: true })
  writeFileSync(join(root, at), "export const held = {}\n")
  const row = { id: "a", title: "Sleep", ...sleep }
  writeFileSync(join(root, at.replace(/\.ts$/, ".sessions.jsonl")), `${JSON.stringify(row)}\n`)
  return root
}

const WOKE_EARLY = sleptBefore("2026-10-07", {
  startedAt: "2026-10-07T01:30:00.000Z",
  endedAt: "2026-10-07T09:30:00.000Z",
})

test("today is the tracked day Alan's sleep opened rather than a morning on the clock", () => {
  expect(todayIn(WOKE_EARLY, new Date("2026-10-07T10:04:00.000Z"))).toBe("2026-10-07")
})

test("an instant before the sleep that opened a day is still the day before", () => {
  expect(todayIn(WOKE_EARLY, new Date("2026-10-07T01:00:00.000Z"))).toBe("2026-10-06")
})

test("a word this takes no argument for is refused", () => {
  const said = fitnessNext(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})

test("a gym flag said with no gym is refused", () => {
  const said = fitnessNext(["--gym"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--gym")
})
