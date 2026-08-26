import { describe, expect, test } from "bun:test"
import type { ReadoutQuery } from "./readout-catalog.ts"
import type { Ask, QueryAnswer } from "./readout-resolver.ts"
import {
  dayGiven,
  drawnOrder,
  earnedIn,
  type ResolvedReadout,
  type ResolvedReadoutGroup,
  readingIn,
  readoutGroupLegend,
  readReadoutGroupReadings,
} from "./readout-resolver.ts"

function readout(label: string, place: number): ResolvedReadout {
  return {
    slug: label.toLowerCase(),
    label,
    unit: "",
    place,
    scale: { slug: "s", redAt: 1, blueAt: 2 },
    keyArgument: null,
    querySlug: null,
    queryKey: null,
    earnedKey: null,
    wireKey: label.toLowerCase(),
    query: null,
  }
}

const UPKEEP: readonly ResolvedReadout[] = [
  readout("Plants", 1),
  readout("Activity", 2),
  readout("Sleep", 3),
  readout("Surplus", 4),
  readout("Capacity", 5),
  readout("Safety", 6),
]

const labels = (drawn: readonly ResolvedReadout[]): readonly string[] => drawn.map((r) => r.label)

function resolvedGroup(
  readouts: readonly ResolvedReadout[],
  unresolved: ReadonlyMap<string, string> = new Map()
): ResolvedReadoutGroup {
  return { slug: "a-group", sortOrder: "place", readouts, unresolved }
}

describe("readoutGroupLegend — a group's legend is the labels of what it draws", () => {
  test("names every readout the group holds, in the order the group draws them", () => {
    expect(readoutGroupLegend(resolvedGroup(UPKEEP))).toBe(
      "Plants · Activity · Sleep · Surplus · Capacity · Safety"
    )
  })

  test("a readout that refused to resolve costs its own name in the legend and no other", () => {
    const [, ...stillDrawn] = UPKEEP
    expect(
      readoutGroupLegend(resolvedGroup(stillDrawn, new Map([["plants", "no scale-slug"]])))
    ).toBe("Activity · Sleep · Surplus · Capacity · Safety")
  })

  test("a group drawing one readout is that one label, with no separator", () => {
    expect(readoutGroupLegend(resolvedGroup([readout("Plants", 1)]))).toBe("Plants")
  })
})

describe("drawnOrder — a group draws its readouts the way its own document says", () => {
  test("`sort-order: place` draws by place, whatever order the readouts arrive in", () => {
    expect(labels(drawnOrder([...UPKEEP].reverse(), "place"))).toEqual([
      "Plants",
      "Activity",
      "Sleep",
      "Surplus",
      "Capacity",
      "Safety",
    ])
  })

  test("`sort-order: label` draws by label, whatever the places say", () => {
    expect(labels(drawnOrder(UPKEEP, "label"))).toEqual([
      "Activity",
      "Capacity",
      "Plants",
      "Safety",
      "Sleep",
      "Surplus",
    ])
  })

  test("readouts sharing a place fall back to label, so the order is never arbitrary", () => {
    const tied = [readout("Wealth", 2), readout("Fun", 2), readout("Faith", 1)]
    expect(labels(drawnOrder(tied, "place"))).toEqual(["Faith", "Fun", "Wealth"])
  })

  test("ordering leaves the readouts themselves alone", () => {
    const drawn = drawnOrder(UPKEEP, "place")
    expect(drawn).toHaveLength(UPKEEP.length)
    const first = UPKEEP[0]
    expect(first).toBeDefined()
    expect(drawn[0]).toBe(first)
  })
})

const DAY = "2026-08-20"

function query(takes: Readonly<Record<string, string>>, reduces = false): ReadoutQuery {
  return { slug: "q", takes, reducesToOneNumber: reduces }
}

function reading(queryKey: string | null, keyArgument: string | null = null): ResolvedReadout {
  return { ...readout("R", 1), queryKey, keyArgument }
}

function answer(one: Partial<QueryAnswer>): QueryAnswer {
  return { n: 0, value: null, over: null, rows: [], faults: [], omitted: [], unfound: [], ...one }
}

function rowed(values: Readonly<Record<string, unknown>>): QueryAnswer {
  return answer({ n: 1, rows: [{ values: { ...values } }] })
}

describe("dayGiven — the day goes to whatever the query calls it", () => {
  test("a query taking `date` is given `date`", () => {
    expect(dayGiven(reading(null), query({ date: "calendar-date" }), DAY)).toEqual({ date: DAY })
  })

  test("a query taking `day` is given `day`, not `date`", () => {
    expect(dayGiven(reading(null), query({ day: "calendar-date" }), DAY)).toEqual({ day: DAY })
  })

  test("a query taking nothing is given nothing", () => {
    expect(dayGiven(reading(null), query({}), DAY)).toEqual({})
  })

  test("an argument that is not a day refuses, naming it and the type it wants", () => {
    expect(() =>
      dayGiven(reading(null), query({ date: "calendar-date", value: "text" }), DAY)
    ).toThrow(/`value` as `text`/)
  })

  test("the argument the source names takes the readout's `query-key`", () => {
    expect(
      dayGiven(reading("faith", "value"), query({ date: "calendar-date", value: "text" }), DAY)
    ).toEqual({ date: DAY, value: "faith" })
  })

  test("naming an argument the query does not take leaves the query's own refusal standing", () => {
    expect(() =>
      dayGiven(reading("faith", "persona"), query({ date: "calendar-date", value: "text" }), DAY)
    ).toThrow(/`value` as `text`/)
  })

  test("an argument named with no `query-key` to fill it still refuses", () => {
    expect(() =>
      dayGiven(reading(null, "value"), query({ date: "calendar-date", value: "text" }), DAY)
    ).toThrow(/`value` as `text`/)
  })
})

describe("readingIn — `query-key` names which number the readout takes", () => {
  test("no `query-key` against a reducing query takes `value`", () => {
    expect(readingIn(reading(null), query({}, true), answer({ n: 1, value: 160 }))).toBe(160)
  })

  test("no `query-key` against a reducing query that measured nothing reads nothing", () => {
    expect(readingIn(reading(null), query({}, true), answer({}))).toBeNull()
  })

  test("no `query-key` against a projection refuses rather than passing on the null in `value`", () => {
    expect(() => readingIn(reading(null), query({}), rowed({ "safety-level": "3" }))).toThrow(
      /names no `query-key`/
    )
  })

  test("a `query-key` already in kebab reads the same key", () => {
    expect(readingIn(reading("safety-level"), query({}), rowed({ "safety-level": "2.5" }))).toBe(
      2.5
    )
  })

  test("`n` reads the count the answer carries rather than anything in its rows", () => {
    const counted = answer({ n: 1, rows: [{ values: { slug: "still-open" } }] })
    expect(readingIn(reading("n"), query({}), counted)).toBe(1)
  })

  test("a `query-key` the answer does not carry refuses, naming every key it does", () => {
    expect(() => readingIn(reading("email"), query({}), rowed({ "inbox-email": "0" }))).toThrow(
      /names `query-key: email`[\s\S]*`inbox-email`/
    )
  })

  test("a day the query answered nothing for reads nothing, which is not a fault", () => {
    expect(readingIn(reading("inbox-email"), query({}), answer({}))).toBeNull()
  })

  test("more than one row refuses, because nothing states which row the readout is", () => {
    const many = answer({ n: 2, rows: [{ values: { points: "1" } }, { values: { points: "2" } }] })
    expect(() => readingIn(reading("points"), query({}), many)).toThrow(/answered 2 rows/)
  })

  test("a key holding what is not a number refuses rather than drawing a blank", () => {
    expect(() =>
      readingIn(reading("inbox-email"), query({}), rowed({ "inbox-email": "lots" }))
    ).toThrow(/which is no number/)
  })

  test("an empty key reads nothing, which is how a day nobody filled in draws", () => {
    expect(readingIn(reading("inbox-email"), query({}), rowed({ "inbox-email": "" }))).toBeNull()
  })
})

describe("readingIn — a key spent on an argument is not also a key in the answer", () => {
  test("a readout whose source names a `key-argument` takes the number the query reduced to", () => {
    const narrowed = answer({ n: 4, value: 1.75 })
    expect(readingIn(reading("faith", "value"), query({}, true), narrowed)).toBe(1.75)
  })

  test("a query that does not reduce refuses, because no key is left to name the number", () => {
    expect(() => readingIn(reading("faith", "value"), query({}), rowed({ faith: "1" }))).toThrow(
      /spends its key on argument `value`/
    )
  })
})

function earning(earnedKey: string | null): ResolvedReadout {
  return { ...readout("R", 1), keyArgument: null, earnedKey }
}

describe("earnedIn — `earned-key` names the fact that earns a scale's earned colour", () => {
  test("a readout naming no `earned-key` is never earned", () => {
    expect(earnedIn(earning(null), query({}), rowed({ "inbox-email-cleared-today": "true" }))).toBe(
      false
    )
  })

  test("a key the answer carries as a boolean reads the same as one it carries as text", () => {
    expect(earnedIn(earning("cleared"), query({}), rowed({ cleared: true }))).toBe(true)
  })

  test("a key standing false is not earned", () => {
    expect(earnedIn(earning("cleared"), query({}), rowed({ cleared: "false" }))).toBe(false)
  })

  test("a day the query answered nothing for is not earned, which is not a fault", () => {
    expect(earnedIn(earning("cleared"), query({}), answer({}))).toBe(false)
  })

  test("an `earned-key` the answer does not carry refuses, naming every key it does", () => {
    expect(() => earnedIn(earning("cleared"), query({}), rowed({ "inbox-email": "0" }))).toThrow(
      /names `earned-key: cleared`[\s\S]*`inbox-email`/
    )
  })

  test("more than one row refuses, because nothing states which of them the readout is", () => {
    const many = answer({ n: 2, rows: [{ values: { cleared: "true" } }, { values: {} }] })
    expect(() => earnedIn(earning("cleared"), query({}), many)).toThrow(/answered 2 rows/)
  })
})

function asking(slug: string, place: number): ResolvedReadout {
  return {
    slug,
    label: slug,
    unit: "green day units",
    place,
    scale: { slug: "s", redAt: 0.25, greenAt: 1, blueAt: 2 },
    querySlug: "q",
    queryKey: slug,
    earnedKey: null,
    wireKey: slug,
    keyArgument: "who",
    query: { slug: "q", takes: { day: "calendar-date", who: "text" }, reducesToOneNumber: true },
  }
}

function answering(refuseFor: ReadonlySet<string>, value: number): Ask {
  return (_querySlug, given) => {
    const who = typeof given.who === "string" ? given.who : ""
    if (refuseFor.has(who)) return Promise.reject(new Error(`no answer for ${who}`))
    return Promise.resolve({
      n: 1,
      value,
      over: null,
      rows: [],
      faults: [],
      omitted: [],
      unfound: [],
    })
  }
}

describe("readReadoutGroupReadings — a reading that refuses costs its own circle only", () => {
  const THREE = [asking("abby", 1), asking("amy", 2), asking("zeli", 3)]

  test("the readouts that answered are all drawn, and the one that did not is named", async () => {
    const read = await readReadoutGroupReadings(
      THREE,
      "2026-08-20",
      answering(new Set(["amy"]), 1.5)
    )
    expect([...read.readings.keys()].sort()).toEqual(["abby", "zeli"])
    expect(read.readings.get("abby")).toBe(1.5)
    expect([...read.unread.keys()]).toEqual(["amy"])
    expect(read.unread.get("amy")).toContain("amy")
  })

  test("a clean run leaves nothing unread — the control that says the holding is not blind", async () => {
    const read = await readReadoutGroupReadings(THREE, "2026-08-20", answering(new Set(), 2))
    expect(read.readings.size).toBe(3)
    expect(read.unread.size).toBe(0)
  })

  test("a feed that answers nothing at all refuses, rather than drawing three black circles", async () => {
    const every = new Set(["abby", "amy", "zeli"])
    await expect(
      readReadoutGroupReadings(THREE, "2026-08-20", answering(every, 1))
    ).rejects.toThrow("every readout of 3 went unread")
  })
})
