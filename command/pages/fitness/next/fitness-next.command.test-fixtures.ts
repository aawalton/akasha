import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  coveredBy,
  type Kit,
} from "akasha/command/pages/fitness/modules/kit-loading/kit-loading.module.code.ts"
import type { Movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import type {
  Bounds,
  Next,
  Offer,
} from "akasha/command/pages/fitness/next/fitness-next.command.code.ts"
import type { Mark } from "akasha/command/pages/fitness/next/modules/marking/marking.module.code.ts"
import { stepFor } from "akasha/command/pages/fitness/next/modules/stepping/stepping.module.code.ts"
import type { Warmth } from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"

export const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const DUMBBELLS: Kit = { covers: ["dumbbell"], loads: [10, 20, 30] }

export const KIT = [DUMBBELLS]

export const COVERED = coveredBy(KIT)

export const BENCH = movement("dumbbell-bench-press")

export function week(
  movements: readonly Movement[],
  took: ReadonlyMap<string, number> = new Map()
) {
  return {
    from: "2026-08-04",
    to: "2026-08-10",
    tally: { muscles: took, patterns: new Map<string, number>(), counted: 0, passed: 0 },
    movements: new Map(movements.map((one) => [one.slug, one])),
    sets: [],
  }
}

export function mark(over: Partial<Mark> = {}): Mark {
  return {
    sets: 4,
    weight: 30,
    reps: 20,
    bestOn: "2026-06-25",
    lastOn: "2026-06-25",
    staleBouts: 0,
    turns: 0,
    byLoad: new Map(),
    ...over,
  }
}

export const KNOWN = new Map<string, Mark>([["dumbbell-bench-press", mark()]])

export const FREE: ReadonlySet<string> = new Set()

export function bounds(over: Partial<Bounds> = {}): Bounds {
  return {
    low: 6,
    ceiling: 12,
    newnessLeft: 0,
    repsCap: 20,
    raising: 5,
    raiseSeconds: 60,
    mobilising: 2,
    easyReps: 10,
    ...over,
  }
}

export const WARM: Warmth = {
  warm: true,
  raised: new Map(),
  turn: 0,
  done: new Set(),
  raisedToday: 0,
}

export const OFFER: Offer = {
  movement: "dumbbell-bench-press",
  title: "Dumbbell Bench Press",
  muscle: "chest",
  owed: 6,
  weight: 30,
  reps: 20,
  atKitCeiling: false,
  familiar: true,
  slower: false,
  step: stepFor(null, {
    movement: "dumbbell-bench-press",
    title: "Dumbbell Bench Press",
    weight: 30,
    reps: 20,
  }),
}

export const BOUNDS = bounds()

export const ROOM = bounds({ repsCap: 25 })

export function next(over: Partial<Next> = {}): Next {
  return {
    gym: null,
    offer: null,
    resting: false,
    cooling: false,
    cool: null,
    lifted: 0,
    target: 3000,
    ...over,
  }
}
