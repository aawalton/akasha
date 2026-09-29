import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { overwhereIiiNalaManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/held/pages/overwhere-iii-nala-mana-weaver.overwhere-iii-trait-held.ts"
import { overwhereIiiManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/pages/overwhere-iii-mana-weaver.overwhere-iii-trait.ts"
import { z } from "zod"

const BANDS = [
  { under: 6, force: "light" },
  { under: 16, force: "solid" },
  { under: 30, force: "heavy" },
] as const

type Force = "light" | "solid" | "heavy" | "crushing"

const WORKING = z.object({
  own: z.number().int().min(0),
  pull: z.number().int().min(0).default(0),
  nearNode: z.boolean().default(false),
})

type Worked = {
  readonly lent: number
  readonly total: number
  readonly force: Force
  readonly strain: number
}

type Settled = { readonly answered: Worked } | { readonly refused: string }

function forceOf(total: number): Force {
  const band = BANDS.find((one) => total < one.under)
  return band === undefined ? "crushing" : band.force
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = WORKING.safeParse(reading)
  if (!held.success) return { refused: `a working reads so: ${z.prettifyError(held.error)}` }
  const { own, pull, nearNode } = held.data
  const draw = overwhereIiiManaWeaver.draw ?? 0
  const factor = nearNode ? (overwhereIiiManaWeaver.nodeFactor ?? 1) : 1
  const lent = draw * overwhereIiiNalaManaWeaver.rank * factor
  const total = own + lent + pull + roll.total
  const strain = pull * (overwhereIiiManaWeaver.strain ?? 0)
  return { answered: { lent, total, force: forceOf(total), strain } }
}
