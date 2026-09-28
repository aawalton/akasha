import { z } from "zod"

const OPENS_AT = Date.parse("2026-09-28T00:00:00.000Z")

const MINUTE = 60_000

const DAY = 24 * 60 * MINUTE

const MOST_MINUTES = 7 * 24 * 60

const LIGHTS = [
  { until: 5 * 60 + 30, light: "night" },
  { until: 6 * 60 + 30, light: "dawn" },
  { until: 18 * 60 + 30, light: "day" },
  { until: 19 * 60 + 30, light: "dusk" },
  { until: 24 * 60, light: "night" },
] as const

const PASSING = z.object({
  from: z.iso.datetime(),
  minutes: z.number().int().min(0).max(MOST_MINUTES),
})

type Light = (typeof LIGHTS)[number]["light"]

type Passed = { readonly endsAt: string; readonly day: number; readonly light: Light }

type Settled = { readonly answered: Passed } | { readonly refused: string }

function lightAt(minuteOfDay: number): Light {
  const found = LIGHTS.find((one) => minuteOfDay < one.until)
  return found === undefined ? "night" : found.light
}

export function settled(reading: unknown): Settled {
  const held = PASSING.safeParse(reading)
  if (!held.success) return { refused: `time passing reads so: ${z.prettifyError(held.error)}` }
  const start = Date.parse(held.data.from)
  if (start < OPENS_AT) return { refused: "no turn ends before the story opens" }
  const ends = start + held.data.minutes * MINUTE
  const day = Math.floor((ends - OPENS_AT) / DAY) + 1
  const minuteOfDay = Math.floor(((ends - OPENS_AT) % DAY) / MINUTE)
  return {
    answered: { endsAt: new Date(ends).toISOString(), day, light: lightAt(minuteOfDay) },
  }
}
