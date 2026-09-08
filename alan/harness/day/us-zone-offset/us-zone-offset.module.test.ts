import { describe, expect, test } from "bun:test"
import { denverOffsetMs, nyOffsetMs } from "./us-zone-offset.module.code.ts"

const MS_PER_HOUR = 3_600_000

function offsetFromZoneDatabase(zone: string): (instantMs: number) => number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
  return (instantMs: number) => {
    const read = Object.fromEntries(
      parts.formatToParts(new Date(instantMs)).map((one) => [one.type, one.value])
    )
    const hour = read.hour === "24" ? "0" : (read.hour as string)
    const wall = Date.UTC(
      Number(read.year),
      Number(read.month) - 1,
      Number(read.day),
      Number(hour),
      Number(read.minute)
    )
    const flooredToMinute = Math.floor(instantMs / 60_000) * 60_000
    return Math.round((wall - flooredToMinute) / 60_000) * 60_000
  }
}

function hoursAroundTheTurns(): readonly number[] {
  const out: number[] = []
  for (let year = 2024; year <= 2027; year++) {
    for (const [month, day] of [
      [2, 1],
      [2, 15],
      [10, 1],
      [10, 15],
    ] as const) {
      const base = Date.UTC(year, month, day)
      for (let hour = 0; hour < 24 * 20; hour++) out.push(base + hour * MS_PER_HOUR)
    }
  }
  return out
}

function turnsOf(offset: (ms: number) => number, sampled: readonly number[]): readonly number[] {
  const found: number[] = []
  for (let i = 1; i < sampled.length; i++) {
    const before = sampled[i - 1] as number
    const at = sampled[i] as number
    if (offset(before) !== offset(at)) found.push(at)
  }
  return found
}

describe("how far behind UTC a US zone is at an instant", () => {
  const sampled = hoursAroundTheTurns()

  test("the sample is the size it claims, so an empty one cannot read clean", () => {
    expect(sampled.length).toBe(4 * 4 * 24 * 20)
    expect(sampled.length).toBe(7680)
  })

  test("New York agrees with the zone database at every sampled hour", () => {
    const truth = offsetFromZoneDatabase("America/New_York")
    expect(sampled.filter((ms) => nyOffsetMs(ms) !== truth(ms)).length).toBe(0)
  })

  test("Denver agrees with the zone database at every sampled hour", () => {
    const truth = offsetFromZoneDatabase("America/Denver")
    expect(sampled.filter((ms) => denverOffsetMs(ms) !== truth(ms)).length).toBe(0)
  })

  test("Denver read on New York's turn is caught, so a clean run is a measurement", () => {
    const truth = offsetFromZoneDatabase("America/Denver")
    const asNewYorkTurned = (ms: number) =>
      nyOffsetMs(ms) === -4 * MS_PER_HOUR ? -6 * MS_PER_HOUR : -7 * MS_PER_HOUR
    expect(sampled.filter((ms) => asNewYorkTurned(ms) !== truth(ms)).length).toBe(16)
  })

  test("Denver turns two hours after New York rather than with it", () => {
    const ny = turnsOf(nyOffsetMs, sampled)
    const denver = turnsOf(denverOffsetMs, sampled)
    expect(ny.length).toBe(8)
    expect(denver.length).toBe(8)
    for (let i = 0; i < ny.length; i++) {
      expect((denver[i] as number) - (ny[i] as number)).toBe(2 * MS_PER_HOUR)
    }
  })
})
