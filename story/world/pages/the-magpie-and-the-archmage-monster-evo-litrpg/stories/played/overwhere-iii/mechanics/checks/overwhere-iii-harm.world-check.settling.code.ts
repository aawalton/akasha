import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { overwhereIiiNala } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/characters/overwhere-iii-nala.character-player.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 5, crushing: 10 } as const

const STRONG_EXTRA = 3

const LEAST = 1

const MOST_WARD = 8

const NALA = `character-player/${overwhereIiiNala.slug}`

const NALA_FLOOR = 1

const BLOW = z.object({
  target: z.string().trim().min(1),
  health: z.number().int().min(0),
  force: z.enum(["light", "solid", "heavy", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(MOST_WARD).default(0),
  beyond: z.boolean().default(false),
})

type Harmed = {
  readonly harm: number
  readonly left: number
  readonly spent: boolean
  readonly down: boolean
}

type Settled = { readonly answered: Harmed } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { target, health, force, landed, ward, beyond } = held.data
  const raw = roll.total + FORCE[force] + (landed === "strong" ? STRONG_EXTRA : 0) - ward
  const harm = Math.max(LEAST, landed === "cost" ? Math.floor(raw / 2) : raw)
  const shielded = target === NALA && !beyond
  const floor = shielded ? Math.min(NALA_FLOOR, health) : 0
  const left = Math.max(floor, health - harm)
  return {
    answered: { harm, left, spent: shielded && left <= NALA_FLOOR, down: !shielded && left === 0 },
  }
}
