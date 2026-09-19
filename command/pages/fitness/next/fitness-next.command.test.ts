import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import {
  type Bounds,
  chosenFor,
  climbOf,
  depthOf,
  droppedIn,
  fitnessNext,
  loadable,
  type Mark,
  marksIn,
  newnessLeftIn,
  type Offer,
  offerOf,
  outIn,
  owedIn,
  performedOn,
  restrictedIn,
  saidOf,
  turnsIn,
} from "akasha/command/pages/fitness/next/fitness-next.command.code.ts"
import {
  coveredBy,
  type Kit,
} from "akasha/command/pages/fitness/next/modules/kit-loading/kit-loading.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const DUMBBELLS: Kit = { covers: ["dumbbell"], loads: [10, 20, 30] }

const KIT = [DUMBBELLS]

const COVERED = coveredBy(KIT)

function movement(slug: string, over: Partial<Movement> = {}): Movement {
  return {
    slug,
    title: slug,
    muscles: ["chest"],
    pattern: "h-push",
    category: "strength",
    implement: "dumbbell",
    scoring: "reps",
    sfr: 5,
    ...over,
  }
}

const BENCH = movement("dumbbell-bench-press")

function week(movements: readonly Movement[], took: ReadonlyMap<string, number> = new Map()) {
  return {
    from: "2026-08-04",
    to: "2026-08-10",
    tally: { muscles: took, patterns: new Map<string, number>(), counted: 0, passed: 0 },
    movements: new Map(movements.map((one) => [one.slug, one])),
    sets: [],
  }
}

function mark(over: Partial<Mark> = {}): Mark {
  return {
    sets: 4,
    weight: 30,
    reps: 20,
    bestOn: "2026-06-25",
    lastOn: "2026-06-25",
    staleBouts: 0,
    turns: 0,
    ...over,
  }
}

const KNOWN = new Map<string, Mark>([["dumbbell-bench-press", mark()]])

const FREE: ReadonlySet<string> = new Set()

function bounds(over: Partial<Bounds> = {}): Bounds {
  return {
    low: 6,
    ceiling: 12,
    newnessLeft: 0,
    repsCap: 20,
    warmupShare: 0.5,
    warmupReps: 10,
    ...over,
  }
}

const WARM: ReadonlySet<string> = new Set(["dumbbell-bench-press"])

const OFFER: Offer = {
  movement: "dumbbell-bench-press",
  title: "Dumbbell Bench Press",
  muscle: "chest",
  owed: 6,
  weight: 30,
  reps: 20,
  atKitCeiling: false,
  familiar: true,
  slower: false,
  warmup: null,
}

const BOUNDS = bounds()

const ROOM = bounds({ repsCap: 25 })

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
  const offer = offerOf(week([BENCH]), KIT, KNOWN, ROOM, FREE)
  expect(offer?.atKitCeiling).toBe(true)
  expect(saidOf(offer).some((one) => one.includes("tops out"))).toBe(true)
})

test("a movement the kit cannot load further is made harder by slowing the rep", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, BOUNDS, FREE)
  expect(offer?.reps).toBe(20)
  expect(offer?.slower).toBe(true)
  expect(saidOf(offer).some((one) => one.includes("lower slowly"))).toBe(true)
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

test("a movement Alan turns down counts against it as much as a set counts for it", () => {
  const turned = turnsIn([{ declineDate: "2026-09-18", exercise: "hammer-curls" }], "2026-09-18")
  const marks = marksIn([], 7, "2026-09-18", turned)
  expect(depthOf(marks.get("hammer-curls"))).toBe(-1)
  expect(depthOf(mark({ sets: 1 }))).toBe(1)
})

test("a movement turned down before today is ranked below one never turned down", () => {
  const two = week([BENCH, CURL])
  const turned = new Map<string, Mark>([
    ["dumbbell-bench-press", mark({ sets: 16, turns: 16 })],
    ["hammer-curls", mark({ sets: 5, weight: 15, reps: 15 })],
  ])
  expect(offerOf(two, KIT, turned, BOUNDS, FREE)?.movement).toBe("hammer-curls")
})

test("a movement is dropped when that movement stops progressing", () => {
  const marks = new Map([["dumbbell-bench-press", mark({ staleBouts: 3, lastOn: "2026-08-10" })]])
  expect(droppedIn(marks, week([BENCH]).movements, 3)).toEqual(new Set(["dumbbell-bench-press"]))
})

test("a movement short of that many bouts is kept however long ago it was", () => {
  const marks = new Map([["dumbbell-bench-press", mark({ staleBouts: 2, lastOn: "2026-01-01" })]])
  expect(droppedIn(marks, week([BENCH]).movements, 3).size).toBe(0)
})

test("a dropped movement is offered again once its pattern has progressed elsewhere", () => {
  const fresh = movement("incline-dumbbell-press")
  const marks = new Map([
    ["dumbbell-bench-press", mark({ staleBouts: 3, lastOn: "2026-06-29" })],
    ["incline-dumbbell-press", mark({ bestOn: "2026-07-10", lastOn: "2026-07-10" })],
  ])
  expect(droppedIn(marks, week([BENCH, fresh]).movements, 3).size).toBe(0)
})

test("a movement Alan has not performed today is warmed up before its working set", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, BOUNDS, FREE)
  expect(offer?.warmup).toEqual({ weight: 10, reps: 10 })
  const said = saidOf(offer)
  expect(said[1]).toBe("  warm up: 10 lb, 10 easy reps")
  expect(said[2]).toBe("  then 30 lb, 20 reps")
})

test("a movement Alan performed already today is offered with no warmup", () => {
  const offer = offerOf(week([BENCH]), KIT, KNOWN, BOUNDS, FREE, WARM)
  expect(offer?.warmup).toBe(null)
  expect(saidOf(offer)[1]).toBe("  30 lb, 20 reps")
})

test("a movement with no working weight yet is warmed up with easy reps and no load", () => {
  const warm = { weight: null, reps: 10 }
  const said = saidOf({ ...OFFER, weight: null, reps: null, warmup: warm })
  expect(said[1]).toBe("  warm up: 10 easy reps")
  expect(said[2]).toContain("then find a load")
})

test("a set logged today counts as performed whether it was a warmup or not", () => {
  const sets = [{ setLogDate: "2026-09-18", exercise: "dumbbell-bench-press", isWarmup: true }]
  expect(performedOn(sets, "2026-09-18")).toEqual(new Set(["dumbbell-bench-press"]))
  expect(performedOn(sets, "2026-09-17").size).toBe(0)
})

test("nothing owed and nothing loadable is answered as rest", () => {
  expect(saidOf(null)[0]).toContain("rest")
})

test("a word this takes no argument for is refused", () => {
  const said = fitnessNext(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
