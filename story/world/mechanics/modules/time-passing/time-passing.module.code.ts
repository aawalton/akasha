import { z } from "zod"

const MINUTE = 60_000

const DAY = 24 * 60 * MINUTE

const MOST_MINUTES = 7 * 24 * 60

const PASSING = z.object({
  from: z.iso.datetime(),
  minutes: z.number().int().min(0).max(MOST_MINUTES),
})

export type Light = "night" | "dawn" | "day" | "dusk"

export type Clock = {
  readonly opensAt: string
  readonly lights: readonly { readonly until: number; readonly light: Light }[]
}

type Passed = { readonly endsAt: string; readonly day: number; readonly light: Light }

export type Settled = { readonly answered: Passed } | { readonly refused: string }

function lightAt(clock: Clock, minuteOfDay: number): Light {
  const found = clock.lights.find((one) => minuteOfDay < one.until)
  return found === undefined ? "night" : found.light
}

export function timePassingSettled(clock: Clock, reading: unknown): Settled {
  const held = PASSING.safeParse(reading)
  if (!held.success) return { refused: `time passing reads so: ${z.prettifyError(held.error)}` }
  const opens = Date.parse(clock.opensAt)
  const start = Date.parse(held.data.from)
  if (start < opens) return { refused: "no turn ends before the story opens" }
  const ends = start + held.data.minutes * MINUTE
  const day = Math.floor((ends - opens) / DAY) + 1
  const minuteOfDay = Math.floor(((ends - opens) % DAY) / MINUTE)
  return {
    answered: { endsAt: new Date(ends).toISOString(), day, light: lightAt(clock, minuteOfDay) },
  }
}
