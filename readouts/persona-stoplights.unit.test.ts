import { describe, expect, test } from "bun:test"
import type { ResolvedReadout } from "./readout-resolver.ts"
import {
  drawPersonaDayColours,
  drawPersonaStoplights,
  type PersonaNamedUnits,
} from "./persona-stoplights.ts"

const SCALE = {
  slug: "readout-scale-green-day-units",
  redAt: 0.25,
  yellowAt: 0.5,
  greenAt: 1,
  blueAt: 2,
}

function readout(slug: string, label: string): ResolvedReadout {
  return {
    slug,
    label,
    unit: "green day units",
    place: 0,
    scale: SCALE,
    querySlug: "persona-green-day-units-on-day",
    queryKey: slug,
    earnedKey: null,
    wireKey: slug,
    keyArgument: "persona",
    query: null,
  }
}

function np(
  slug: string,
  name: string,
  valueSlug: string,
  greenDayUnits: number,
  seq = 0
): PersonaNamedUnits {
  return { slug, name, valueSlug, greenDayUnits, seq, personaId: `id-${slug}` }
}

describe("drawPersonaStoplights — one circle per persona, on her OWN reading", () => {
  test("HER OWN reading decides her circle, never her value's sum", () => {
    const circles = drawPersonaStoplights(
      [readout("ruby", "Ruby"), readout("mari", "Mari")],
      new Map([
        ["ruby", 0.2],
        ["mari", 0.9],
      ]),
      [np("ruby", "Ruby", "love", 0), np("mari", "Mari", "love", 0)],
      "label"
    )
    expect(circles.map((c) => [c.persona, c.tier])).toEqual([
      ["Mari", "yellow"],
      ["Ruby", "black"],
    ])
  })

  test("the reading drawn is the one the query answered, at the scale's two decimals", () => {
    const circles = drawPersonaStoplights(
      [readout("athena", "Athena")],
      new Map([["athena", 1.164]]),
      [np("athena", "Athena", "learn", 0)],
      "label"
    )
    expect(circles[0]?.reading).toBe("1.16")
  })

  test("the reading comes from the query, not from the persona row beside it", () => {
    const circles = drawPersonaStoplights(
      [readout("nova", "Nova")],
      new Map([["nova", 2.5]]),
      [np("nova", "Nova", "health", 0.1)],
      "label"
    )
    expect(circles[0]?.tier).toBe("blue")
  })

  test("order is the group's, cutting across the values", () => {
    const roster = [
      ["vera", "Vera", "health"],
      ["aine", "Aine", "faith"],
      ["abby", "Abby", "fun"],
      ["ali", "Ali", "learn"],
      ["thea", "Thea", "wealth"],
      ["ruby", "Ruby", "love"],
    ] as const
    const circles = drawPersonaStoplights(
      roster.map(([slug, label]) => readout(slug, label)),
      new Map(roster.map(([slug]) => [slug, 1])),
      roster.map(([slug, name, value]) => np(slug, name, value, 1)),
      "label"
    )
    expect(circles.map((c) => c.persona)).toEqual(["Abby", "Aine", "Ali", "Ruby", "Thea", "Vera"])
  })

  test("two personas of one label are ordered by seq, whichever order they arrive in", () => {
    const younger = np("selah-a", "Selah", "love", 0, 3)
    const older = np("selah-b", "Selah", "love", 0, 7)
    for (const input of [
      [younger, older],
      [older, younger],
    ]) {
      const circles = drawPersonaStoplights(
        [readout("selah-a", "Selah"), readout("selah-b", "Selah")],
        new Map([
          ["selah-a", 0.5],
          ["selah-b", 1],
        ]),
        input,
        "label"
      )
      expect(circles.map((c) => c.reading)).toEqual(["0.50", "1.00"])
    }
  })

  test("a persona the day never wrote a row for reads as nothing, not as zero earned", () => {
    const circles = drawPersonaStoplights(
      [readout("vera", "Vera")],
      new Map([["vera", null]]),
      [np("vera", "Vera", "health", 0)],
      "label"
    )
    expect(circles[0]?.tier).toBe("black")
    expect(circles[0]?.nextTier).toBeNull()
  })

  test("a readout with no persona row beside it is not drawn at all", () => {
    const circles = drawPersonaStoplights(
      [readout("claude", "Claude"), readout("abby", "Abby")],
      new Map([
        ["claude", null],
        ["abby", 1],
      ]),
      [np("abby", "Abby", "fun", 1)],
      "label"
    )
    expect(circles.map((c) => c.persona)).toEqual(["Abby"])
  })

  test("she carries the value she rolls up to, so the tile can group without a second read", () => {
    const circles = drawPersonaStoplights(
      [readout("talia", "Talia")],
      new Map([["talia", 0.5]]),
      [np("talia", "Talia", "faith", 0.5)],
      "label"
    )
    expect(circles[0]?.value).toBe("faith")
  })
})

describe("drawPersonaDayColours — the same circles, as the rewarder reads them", () => {
  test("the tier and the number both come from the query's reading", () => {
    const colours = drawPersonaDayColours(
      [readout("ione", "Ione")],
      new Map([["ione", 1.25]]),
      [np("ione", "Ione", "health", 0)],
      "label"
    )
    expect(colours).toEqual([
      {
        personaId: "id-ione",
        slug: "ione",
        name: "Ione",
        valueSlug: "health",
        greenDayUnits: 1.25,
        tier: "green",
      },
    ])
  })

  test("a persona with no row for the day is black at zero", () => {
    const colours = drawPersonaDayColours(
      [readout("zeli", "Zeli")],
      new Map([["zeli", null]]),
      [np("zeli", "Zeli", "fun", 0)],
      "label"
    )
    expect(colours[0]?.tier).toBe("black")
    expect(colours[0]?.greenDayUnits).toBe(0)
  })
})
