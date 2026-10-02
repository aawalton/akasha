import {
  bandedSettled,
  type Settled,
} from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { overwhereIiiNalaManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/held/pages/overwhere-iii-nala-mana-weaver.overwhere-iii-trait-held.ts"
import { overwhereIiiManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/pages/overwhere-iii-mana-weaver.overwhere-iii-trait.ts"
import { z } from "zod"

const MANA_WEAVER = "Mana Weaver"

const WEAVING = z.looseObject({
  bonuses: z.array(z.looseObject({ from: z.string(), by: z.unknown().optional() })),
})

export function settledAt(reading: unknown, roll: Rolled, rank: number): Settled {
  const read = WEAVING.safeParse(reading)
  if (!read.success) return bandedSettled(reading, roll)
  const weaver = (from: string) => from.trim() === MANA_WEAVER
  const misread = read.data.bonuses.find(
    (one) => weaver(one.from) && one.by !== undefined && one.by !== rank
  )
  if (misread !== undefined) {
    return {
      refused: `Mana Weaver adds her rank, ${rank}, rather than ${String(misread.by)}; name it with no by`,
    }
  }
  const bonuses = read.data.bonuses.map((one) => (weaver(one.from) ? { ...one, by: rank } : one))
  return bandedSettled({ ...read.data, bonuses }, roll, overwhereIiiManaWeaver.ranks.length)
}

export function settled(reading: unknown, roll: Rolled): Settled {
  return settledAt(reading, roll, overwhereIiiNalaManaWeaver.rank)
}
