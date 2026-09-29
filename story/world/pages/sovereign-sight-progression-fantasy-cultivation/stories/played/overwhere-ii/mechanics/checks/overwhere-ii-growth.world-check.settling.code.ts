import { z } from "zod"

const ATTRIBUTES = ["Might", "Speed", "Wits", "Presence"] as const

const DEPTHS = [
  "Surface",
  "First Depth",
  "Second Depth",
  "Third Depth",
  "Fourth Depth",
  "Fifth Depth",
  "Sixth Depth",
  "Seventh Depth",
  "Eighth Depth",
  "Ninth Depth",
] as const

type Depth = (typeof DEPTHS)[number]

const VALUE_PER_EARNEST_DAY = 4

const TRIALS_PER_DEPTH = 5

const ATTRIBUTE = z.object({
  kind: z.literal("attribute"),
  attribute: z.enum(ATTRIBUTES),
  value: z.number().int().min(0),
  earnestDays: z.number().int().min(0),
})

const DEPTH = z.object({
  kind: z.literal("depth"),
  depth: z.enum(DEPTHS),
  trials: z.number().int().min(0),
  descended: z.boolean(),
})

const GROWING = z.object({
  character: z.string().trim().min(1),
  gains: z.array(z.discriminatedUnion("kind", [ATTRIBUTE, DEPTH])).min(1),
})

type AttributeGrown = {
  readonly kind: "attribute"
  readonly attribute: (typeof ATTRIBUTES)[number]
  readonly from: number
  readonly to: number
  readonly daysCarried: number
}

type DepthGrown = {
  readonly kind: "depth"
  readonly from: Depth
  readonly to: Depth
  readonly trialsNeeded: number
  readonly reachAndDrawDoubled: boolean
}

type Grown = AttributeGrown | DepthGrown

type Settled =
  | { readonly answered: { readonly grown: readonly Grown[] } }
  | { readonly refused: string }

function earnestDaysPerRise(value: number): number {
  return Math.max(1, Math.floor(value / VALUE_PER_EARNEST_DAY))
}

function grownAttribute(gain: z.infer<typeof ATTRIBUTE>): AttributeGrown {
  let value = gain.value
  let days = gain.earnestDays
  for (let needed = earnestDaysPerRise(value); days >= needed; needed = earnestDaysPerRise(value)) {
    days -= needed
    value += 1
  }
  return {
    kind: "attribute",
    attribute: gain.attribute,
    from: gain.value,
    to: value,
    daysCarried: days,
  }
}

function grownDepth(gain: z.infer<typeof DEPTH>): DepthGrown {
  const at = DEPTHS.indexOf(gain.depth)
  const trialsNeeded = TRIALS_PER_DEPTH * (at + 1)
  const next = DEPTHS[at + 1]
  const to = next !== undefined && gain.descended && gain.trials >= trialsNeeded ? next : gain.depth
  return {
    kind: "depth",
    from: gain.depth,
    to,
    trialsNeeded,
    reachAndDrawDoubled: to !== gain.depth,
  }
}

export function settled(reading: unknown): Settled {
  const parsed = GROWING.safeParse(reading)
  if (!parsed.success) return { refused: `growth reads so: ${z.prettifyError(parsed.error)}` }
  const grown = parsed.data.gains.map(
    (gain): Grown => (gain.kind === "attribute" ? grownAttribute(gain) : grownDepth(gain))
  )
  return { answered: { grown } }
}
