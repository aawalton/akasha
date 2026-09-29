import { z } from "zod"

const DEED_WEIGHTS = {
  prayer: 1,
  offering: 1,
  "oath-kept": 2,
  "oath-broken": -10,
  desecration: -10,
} as const

const THRESHOLDS = [10, 25, 50, 75, 100] as const

const MOST = 100

const DEED = z.discriminatedUnion("kind", [
  z.object({ kind: z.enum(["prayer", "offering", "oath-kept", "oath-broken", "desecration"]) }),
  z.object({ kind: z.literal("domain-deed"), by: z.number().int().min(1).max(3) }),
])

const NOTICING = z.object({
  character: z.string().trim().min(1),
  gods: z
    .array(
      z.object({
        god: z.string().trim().min(1),
        value: z.number().int().min(0).max(MOST),
        deeds: z.array(DEED).min(1),
      })
    )
    .min(1),
})

type Noticed = {
  readonly god: string
  readonly from: number
  readonly to: number
  readonly reached: readonly number[]
}

type Settled =
  | { readonly answered: { readonly noticed: readonly Noticed[] } }
  | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = NOTICING.safeParse(reading)
  if (!held.success) return { refused: `notice reads so: ${z.prettifyError(held.error)}` }
  const noticed = held.data.gods.map((one): Noticed => {
    const moved = one.deeds.reduce(
      (sum, deed) => sum + (deed.kind === "domain-deed" ? deed.by : DEED_WEIGHTS[deed.kind]),
      0
    )
    const to = Math.max(0, Math.min(MOST, one.value + moved))
    const reached = THRESHOLDS.filter((mark) => one.value < mark && to >= mark)
    return { god: one.god, from: one.value, to, reached }
  })
  return { answered: { noticed } }
}
