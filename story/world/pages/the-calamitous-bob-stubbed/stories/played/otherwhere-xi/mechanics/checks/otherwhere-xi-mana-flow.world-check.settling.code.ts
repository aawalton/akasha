import { z } from "zod"

const CASTS_AT = 3

const SIZES = {
  flare: { cost: 1, force: "none" },
  small: { cost: 3, force: "light" },
  moderate: { cost: 8, force: "solid" },
  large: { cost: 20, force: "heavy" },
  great: { cost: 50, force: "savage" },
} as const

type Size = keyof typeof SIZES

const PER_EXTRA_RUNE = 2

const BANDS = ["easy", "standard", "hard", "extreme"] as const

const ONE_CASTING = z.object({
  size: z.enum(["flare", "small", "moderate", "large", "great"]),
  runes: z.number().int().min(1).max(8),
  leaning: z.enum(["aspected", "plain", "colorless"]).default("plain"),
})

const CASTINGS = z.object({
  character: z.string().trim().min(1),
  mana: z.number().int().min(0),
  attunement: z.number().min(0).max(100),
  focus: z.number().int().min(0),
  castings: z.array(ONE_CASTING).min(1),
})

type Cast = {
  readonly cost: number
  readonly force: (typeof SIZES)[Size]["force"]
  readonly band: (typeof BANDS)[number]
}

type Settled =
  | { readonly answered: { readonly casts: readonly Cast[]; readonly manaLeft: number } }
  | { readonly refused: string }

function mostRunes(focus: number): number {
  return 1 + Math.floor(Math.max(0, focus - 10) / 10)
}

function costOf(size: Size, runes: number, leaning: string): number {
  const base = SIZES[size].cost + (runes - 1) * PER_EXTRA_RUNE
  if (leaning === "aspected") return Math.max(1, Math.floor(base * 0.75))
  if (leaning === "colorless") return Math.ceil(base * 1.5)
  return base
}

export function settled(reading: unknown): Settled {
  const held = CASTINGS.safeParse(reading)
  if (!held.success) return { refused: `castings read so: ${z.prettifyError(held.error)}` }
  const { mana, attunement, focus, castings } = held.data
  if (attunement < CASTS_AT) return { refused: "below three percent attunement no one casts" }
  const most = mostRunes(focus)
  let left = mana
  const casts: Cast[] = []
  for (const casting of castings) {
    if (casting.runes > most) {
      return { refused: `her Focus holds ${most} rune at once, not ${casting.runes}` }
    }
    const cost = costOf(casting.size, casting.runes, casting.leaning)
    if (cost > left) return { refused: `a casting costs ${cost} and she holds ${left}` }
    left -= cost
    const band = BANDS[Math.min(BANDS.length - 1, casting.runes - 1)] ?? "extreme"
    casts.push({ cost, force: SIZES[casting.size].force, band })
  }
  return { answered: { casts, manaLeft: left } }
}
