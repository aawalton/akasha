import { z } from "zod"

const NEAR_CIRCLES = ["village", "march", "kingdom"] as const

const FAR_POWERS = ["verdant-empire", "umarii", "iron-march"] as const

const DEED_WEIGHTS = {
  "seen-using-power": 1,
  spectacle: 2,
  "word-carried": 1,
  "quiet-season": -1,
} as const

type Deed = keyof typeof DEED_WEIGHTS

const DEEDS = Object.keys(DEED_WEIGHTS) as [Deed, ...Deed[]]

const MOST = 5

const SOUGHT_AT = 3

const NOTICING = z.object({
  character: z.string().trim().min(1),
  circles: z
    .array(
      z.object({
        circle: z.enum([...NEAR_CIRCLES, ...FAR_POWERS]),
        value: z.number().int().min(0).max(MOST),
        deeds: z.array(z.object({ kind: z.enum(DEEDS) })).min(1),
      })
    )
    .min(1),
})

type Circle = z.infer<typeof NOTICING>["circles"][number]["circle"]

type Noticed = {
  readonly circle: Circle
  readonly from: number
  readonly to: number
  readonly sought: boolean
  readonly agents: boolean
}

type Settled =
  | { readonly answered: { readonly noticed: readonly Noticed[] } }
  | { readonly refused: string }

function isFar(circle: Circle): boolean {
  return (FAR_POWERS as readonly string[]).includes(circle)
}

export function settled(reading: unknown): Settled {
  const held = NOTICING.safeParse(reading)
  if (!held.success) return { refused: `notice reads so: ${z.prettifyError(held.error)}` }
  const noticed = held.data.circles.map((one): Noticed => {
    const moved = one.deeds.reduce((sum, deed) => sum + DEED_WEIGHTS[deed.kind], 0)
    const to = Math.max(0, Math.min(MOST, one.value + moved))
    return {
      circle: one.circle,
      from: one.value,
      to,
      sought: one.value < SOUGHT_AT && to >= SOUGHT_AT,
      agents: isFar(one.circle) && one.value < MOST && to >= MOST,
    }
  })
  return { answered: { noticed } }
}
