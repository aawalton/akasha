import { describe, expect, test } from "bun:test"
import type { ResolvedReadout } from "./readout-resolver.ts"
import {
  aggregateValueUnits,
  drawValueStoplights,
  type PersonaDaily,
  type PersonaDayUnits,
  perfectDayFromTiers,
  type ValueStoplight,
} from "./daily-stoplights.ts"

const SCALE = {
  slug: "readout-scale-green-day-units",
  redAt: 0.25,
  yellowAt: 0.5,
  greenAt: 1,
  blueAt: 2,
}

function readout(slug: string, label: string, place: number): ResolvedReadout {
  return {
    slug,
    label,
    unit: "green day units",
    place,
    scale: SCALE,
    querySlug: "value-green-day-units-on-day",
    queryKey: slug,
    earnedKey: null,
    wireKey: slug,
    keyArgument: "value",
    query: null,
  }
}

const SIX: readonly ResolvedReadout[] = [
  readout("faith", "Faith", 1),
  readout("love", "Love", 2),
  readout("health", "Health", 3),
  readout("learn", "Learn", 4),
  readout("fun", "Fun", 5),
  readout("wealth", "Wealth", 6),
]

function reads(of: Partial<Record<string, number | null>>): ReadonlyMap<string, number | null> {
  return new Map(SIX.map((one) => [one.slug, of[one.slug] ?? null]))
}

function tiers(
  overrides: Partial<Record<string, ValueStoplight["tier"]>>,
  fill: ValueStoplight["tier"] = "green"
): readonly { readonly tier: ValueStoplight["tier"] }[] {
  return SIX.map((one) => ({ value: one.slug, tier: overrides[one.slug] ?? fill }))
}

function p(valueSlug: string, greenDayUnits: number): PersonaDayUnits {
  return { valueSlug, greenDayUnits }
}

describe("aggregateValueUnits — SUM of COLOUR-FLOORED greenDayUnits per value", () => {
  test("a value's aggregate SUMS over ALL its personas, each floored to her rung", () => {
    const sums = aggregateValueUnits([
      p("health", 0.364),
      p("health", 0),
      p("health", 1.164),
      p("health", 0),
    ])
    expect(sums.get("health")).toBeCloseTo(1.25, 5)
  })

  test("a single-persona value's sum is her rung's floor, not her reading", () => {
    expect(aggregateValueUnits([p("love", 0)]).get("love")).toBe(0)
    expect(aggregateValueUnits([p("wealth", 1.5)]).get("wealth")).toBe(1)
  })

  test("the rule Alan stated: three personas at 0.9 give GREEN, where raw gave blue", () => {
    const sums = aggregateValueUnits([p("faith", 0.9), p("faith", 0.9), p("faith", 0.9)])
    expect(sums.get("faith")).toBeCloseTo(1.5, 5)
  })

  test("a persona below the first rung carries nothing into her value", () => {
    expect(aggregateValueUnits([p("learn", 0.24)]).get("learn")).toBe(0)
  })

  test("a value with no personas is absent (resolves to a black circle downstream)", () => {
    expect(aggregateValueUnits([p("fun", 0)]).has("faith")).toBe(false)
  })
})

describe("perfectDayFromTiers — the #15080 perfect-day verdict", () => {
  test("all six green → green perfect, not blue", () => {
    expect(perfectDayFromTiers(tiers({}, "green"), 6)).toEqual({ green: true, blue: false })
  })

  test("all six blue → both perfect (monotonic: all-blue satisfies the green gate)", () => {
    expect(perfectDayFromTiers(tiers({}, "blue"), 6)).toEqual({ green: true, blue: true })
  })

  test("five green + one blue → green perfect, not blue", () => {
    expect(perfectDayFromTiers(tiers({ wealth: "blue" }, "green"), 6)).toEqual({
      green: true,
      blue: false,
    })
  })

  test("any value below green breaks both", () => {
    expect(perfectDayFromTiers(tiers({ fun: "yellow" }, "green"), 6)).toEqual({
      green: false,
      blue: false,
    })
    expect(perfectDayFromTiers(tiers({ love: "red" }, "blue"), 6)).toEqual({
      green: false,
      blue: false,
    })
    expect(perfectDayFromTiers(tiers({ faith: "black" }, "green"), 6)).toEqual({
      green: false,
      blue: false,
    })
  })

  test("an incomplete set (not all six present) is never a perfect day", () => {
    expect(perfectDayFromTiers([], 6)).toEqual({ green: false, blue: false })
    expect(perfectDayFromTiers([{ tier: "blue" }], 6)).toEqual({
      green: false,
      blue: false,
    })
  })
})

function daily(overrides: Partial<PersonaDaily> & Pick<PersonaDaily, "valueSlug">): PersonaDaily {
  return {
    greenDayUnits: 1,
    name: "Persona",
    seq: 1,
    lastMessagedAt: null,
    personaId: "id",
    slug: "persona",
    ...overrides,
  }
}

describe("drawValueStoplights — one circle per readout the group names", () => {
  test("the circles come back in the order the group handed them, whoever served them", () => {
    const drawn = drawValueStoplights(SIX, reads({ faith: 1, wealth: 1 }), [
      daily({ valueSlug: "wealth" }),
      daily({ valueSlug: "faith" }),
    ])
    expect(drawn.map((circle) => circle.value)).toEqual(SIX.map((one) => one.slug))
  })

  test("each circle is labelled from its readout, not from its slug", () => {
    const drawn = drawValueStoplights(SIX, reads({}), [])
    expect(drawn.map((circle) => circle.label)).toEqual([
      "Faith",
      "Love",
      "Health",
      "Learn",
      "Fun",
      "Wealth",
    ])
  })

  test("the reading is the query's, not a sum folded from the personas beside it", () => {
    const drawn = drawValueStoplights(SIX, reads({ health: 2 }), [
      daily({ valueSlug: "health", greenDayUnits: 0 }),
    ])
    const health = drawn.find((circle) => circle.value === "health")
    expect(health?.tier).toBe("blue")
    expect(health?.reading).toBe("2.00")
  })

  test("a value the day recorded nothing for reads as nothing, not as zero earned", () => {
    const drawn = drawValueStoplights(SIX, reads({}), [daily({ valueSlug: "faith" })])
    const love = drawn.find((circle) => circle.value === "love")
    expect(love?.tier).toBe("black")
    expect(love?.nextTier).toBeNull()
  })

  test("a value no persona serves carries no face", () => {
    const drawn = drawValueStoplights(SIX, reads({ faith: 1 }), [daily({ valueSlug: "faith" })])
    expect(drawn.find((circle) => circle.value === "love")?.face).toBeNull()
  })

  test("the face is the most overdue persona — the stamp decides, not the seq", () => {
    const drawn = drawValueStoplights(SIX, reads({ fun: 1 }), [
      daily({ valueSlug: "fun", name: "Recent", seq: 1, lastMessagedAt: "2026-08-19T00:00:00Z" }),
      daily({ valueSlug: "fun", name: "Overdue", seq: 9, lastMessagedAt: "2026-01-01T00:00:00Z" }),
    ])
    expect(drawn.find((circle) => circle.value === "fun")?.face).toBe("Overdue")
  })

  test("a persona never messaged is the most overdue of all", () => {
    const drawn = drawValueStoplights(SIX, reads({ fun: 1 }), [
      daily({ valueSlug: "fun", name: "Messaged", seq: 1, lastMessagedAt: "2020-01-01T00:00:00Z" }),
      daily({ valueSlug: "fun", name: "Never", seq: 9, lastMessagedAt: null }),
    ])
    expect(drawn.find((circle) => circle.value === "fun")?.face).toBe("Never")
  })

  test("personas sharing a stamp fall back to seq, lowest first", () => {
    const stamp = "2026-08-01T00:00:00Z"
    const drawn = drawValueStoplights(SIX, reads({ learn: 1 }), [
      daily({ valueSlug: "learn", name: "Later", seq: 7, lastMessagedAt: stamp }),
      daily({ valueSlug: "learn", name: "Earlier", seq: 2, lastMessagedAt: stamp }),
    ])
    expect(drawn.find((circle) => circle.value === "learn")?.face).toBe("Earlier")
  })

  test("an unnamed persona never becomes a face, however overdue", () => {
    const drawn = drawValueStoplights(SIX, reads({ love: 1 }), [
      daily({ valueSlug: "love", name: null, seq: 1, lastMessagedAt: null }),
      daily({ valueSlug: "love", name: "Named", seq: 2, lastMessagedAt: "2026-08-19T00:00:00Z" }),
    ])
    expect(drawn.find((circle) => circle.value === "love")?.face).toBe("Named")
  })
})
