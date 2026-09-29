import { z } from "zod"

const BASE_MANA_BY_TIER = [0, 20, 60, 180, 540] as const

const MANA_PATH_GAIN = 3

const STRAINS = [
  { over: 0, strain: "none", harmTimesTier: 0, bonus: 0 },
  { over: 0.25, strain: "ache", harmTimesTier: 0, bonus: -1 },
  { over: 0.5, strain: "migraine", harmTimesTier: 1, bonus: -2 },
  { over: 1, strain: "nosebleed", harmTimesTier: 3, bonus: -3 },
  { over: Number.POSITIVE_INFINITY, strain: "collapse", harmTimesTier: 6, bonus: -4 },
] as const

const DRAW = z.object({
  character: z.string().trim().min(1),
  tier: z
    .number()
    .int()
    .min(1)
    .max(BASE_MANA_BY_TIER.length - 1),
  manaPathPercent: z.number().int().min(0).max(100),
  mana: z.number().int().min(0),
  spent: z.number().int().min(0),
})

type Drawn = {
  readonly maxMana: number
  readonly mana: number
  readonly overdrawn: number
  readonly strain: (typeof STRAINS)[number]["strain"]
  readonly harm: number
  readonly bonus: number
}

type Settled = { readonly answered: Drawn } | { readonly refused: string }

type Added = { readonly page: string; readonly key: string; readonly by: number }

export function maxManaOf(tier: number, manaPathPercent: number): number {
  const base = BASE_MANA_BY_TIER[tier] ?? 0
  return Math.round(base * (1 + (MANA_PATH_GAIN * manaPathPercent) / 100))
}

export function settled(reading: unknown): Settled {
  const held = DRAW.safeParse(reading)
  if (!held.success) return { refused: `a draw of mana reads so: ${z.prettifyError(held.error)}` }
  const { tier, manaPathPercent, mana, spent } = held.data
  const maxMana = maxManaOf(tier, manaPathPercent)
  if (mana > maxMana) return { refused: `mana ${mana} is past her most mana ${maxMana}` }
  const overdrawn = Math.max(0, spent - mana)
  const share = overdrawn / maxMana
  const found = STRAINS.find((one) => share <= one.over) ?? STRAINS[STRAINS.length - 1]
  return {
    answered: {
      maxMana,
      mana: Math.max(0, mana - spent),
      overdrawn,
      strain: found?.strain ?? "collapse",
      harm: (found?.harmTimesTier ?? 0) * tier,
      bonus: found?.bonus ?? 0,
    },
  }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const held = DRAW.safeParse(reading)
  const drawn = answered as Drawn
  if (!held.success) return []
  const change = drawn.mana - held.data.mana
  if (change === 0) return []
  return [{ page: `otherwhere-x-mana/${held.data.character}`, key: "value", by: change }]
}
