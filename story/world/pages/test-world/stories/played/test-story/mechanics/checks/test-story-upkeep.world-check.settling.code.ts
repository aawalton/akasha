import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { metricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.ts"
import { testStoryPlayer } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/metrics/purses/test-story-player.metric-character-currency.ts"
import { z } from "zod"

const BOARD = 3

const BROKE = "no coin left for the next day's board"

const KEEP = z.object({
  character: z.string().trim().min(1),
  coin: z.number().int().min(0),
})

const KEPT = z.object({ paid: z.number().int().min(0), coinLeft: z.number().int().min(0) })

type Kept = z.infer<typeof KEPT>

type Settled = { readonly answered: Kept } | { readonly refused: string }

type Next = {
  readonly reading: unknown
  readonly crossed: readonly string[]
  readonly left: string | null
}

export function settled(reading: unknown): Settled {
  const held = KEEP.safeParse(reading)
  if (!held.success) return { refused: `upkeep reads so: ${z.prettifyError(held.error)}` }
  if (held.data.coin < BOARD) {
    return { refused: `a day's board is ${BOARD} coin, and ${held.data.coin} is held` }
  }
  return { answered: { paid: BOARD, coinLeft: held.data.coin - BOARD } }
}

export function added(_reading: unknown, answered: unknown): readonly Added[] {
  const kept = KEPT.safeParse(answered)
  if (!kept.success) return []
  const page = `${metricCharacterCurrency.slug}/${testStoryPlayer.slug}`
  return [{ page, key: "value", by: -kept.data.paid }]
}

export function next(reading: unknown, answered: unknown): Next {
  const held = KEEP.parse(reading)
  const kept = KEPT.parse(answered)
  return {
    reading: { ...held, coin: kept.coinLeft },
    crossed: [],
    left: kept.coinLeft < BOARD ? BROKE : null,
  }
}
