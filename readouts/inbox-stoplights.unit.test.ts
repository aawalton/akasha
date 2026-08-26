import { describe, expect, test } from "bun:test"
import type {
  ReadoutReading,
  ResolvedReadout,
} from "./readout-resolver.ts"
import type { ReadoutScale } from "./readout-scale-shape.ts"
import { UNKNOWN_READING } from "./circle/circle.ts"
import { groupCircle } from "./upkeep-stoplights.ts"

const DAILY_INBOX: ReadoutScale = {
  slug: "readout-scale-daily-inbox",
  blackAt: 100,
  redAt: 10,
  yellowAt: 1,
  blueAt: 0,
  earnedColorSlug: "green",
}

const LIVE_COUNT: ReadoutScale = {
  slug: "readout-scale-live-count",
  redAt: 4,
  yellowAt: 2,
  greenAt: 1,
  blueAt: 0,
}

const readout = (under: string, label: string, scale: ReadoutScale): ResolvedReadout => ({
  slug: `inboxes-${under}`,
  label,
  unit: "",
  place: 1,
  scale,
  querySlug: null,
  queryKey: null,
  earnedKey: null,
  wireKey: under,
  keyArgument: null,
  query: null,
})

const TASKS = readout("tasks", "tasks", DAILY_INBOX)
const TEMPER_TASKS = readout("temperTasks", "temper-tasks", DAILY_INBOX)
const QUESTIONS = readout("questions", "questions", LIVE_COUNT)

const read = (reading: number | null, earned = false): ReadoutReading => ({ reading, earned })

describe("`A subject with no reading is black`", () => {
  test("a day the query answers nothing for is black, never the blue a stated zero earns", () => {
    expect(groupCircle(TASKS, read(null)).tier).toBe("black")
  })

  test("an earned flag with no reading behind it is black just the same", () => {
    expect(groupCircle(TASKS, read(null, true)).tier).toBe("black")
  })
})

describe("`A readout with no reading says so`", () => {
  test("an unread inbox draws `?` rather than the figure a real one would draw", () => {
    expect(groupCircle(TASKS, read(null)).reading).toBe(UNKNOWN_READING)
  })

  test("an earned flag with no reading behind it still says unknown", () => {
    expect(groupCircle(TASKS, read(null, true)).reading).toBe(UNKNOWN_READING)
  })
})

describe("`An inbox holding nothing is blue, and a daily inbox cleared to zero earlier today is green`", () => {
  test("a stated zero is blue, which is what an unknown must not be mistaken for", () => {
    const circle = groupCircle(TASKS, read(0))
    expect(circle.tier).toBe("blue")
    expect(circle.reading).toBe("0")
  })

  test("a count cleared to zero earlier today is green, off `earned-color-slug`", () => {
    expect(groupCircle(TASKS, read(6, true)).tier).toBe("green")
  })

  test("an inbox standing at zero stays blue when it was also cleared", () => {
    expect(groupCircle(TASKS, read(0, true)).tier).toBe("blue")
  })
})

describe("`A daily inbox of a hundred or more is black, not a missing reading`", () => {
  test("a hundred or more is black but reads its figure, which is what parts it from unknown", () => {
    const circle = groupCircle(TASKS, read(120))
    expect(circle.tier).toBe("black")
    expect(circle.reading).toBe("120")
    expect(circle.reading).not.toBe(UNKNOWN_READING)
  })
})

describe("`Every difference between readouts stands in data, not code`", () => {
  test("one reading draws two tiers, because the two readouts name different scales", () => {
    expect(groupCircle(QUESTIONS, read(1)).tier).toBe("green")
    expect(groupCircle(TASKS, read(1)).tier).toBe("yellow")
  })

  test("the caption drawn is the readout's own `label:`", () => {
    expect(groupCircle(TEMPER_TASKS, read(0)).label).toBe("temper-tasks")
    expect(groupCircle(QUESTIONS, read(0)).label).toBe("questions")
  })

  test("the wire key drawn is the readout's own `wire-key:`, not a cut of its slug", () => {
    expect(groupCircle(TEMPER_TASKS, read(0)).key).toBe("temperTasks")
    expect(groupCircle(QUESTIONS, read(0)).key).toBe("questions")
  })
})
