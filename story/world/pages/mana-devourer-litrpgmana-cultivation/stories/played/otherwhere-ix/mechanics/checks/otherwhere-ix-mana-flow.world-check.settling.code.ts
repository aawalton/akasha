import { z } from "zod"

const REGAINED_PER_SPIRIT_HOUR = 0.5

const ASLEEP_MULTIPLIER = 2

const HARM_PER_BURNED = 0.5

const FLOW = z
  .object({
    character: z.string().trim().min(1),
    mana: z.number().int().min(0),
    maxMana: z.number().int().min(1),
    spirit: z.number().int().min(0),
    spent: z.number().int().min(0).default(0),
    taken: z.number().int().min(0).default(0),
    hoursAwake: z.number().min(0).default(0),
    hoursAsleep: z.number().min(0).default(0),
  })
  .refine((flow) => flow.mana <= flow.maxMana, "mana is at most the most mana")
  .refine((flow) => flow.spent <= flow.mana + flow.taken, "no more is spent than is held")

type Flowed = { readonly mana: number; readonly burned: number; readonly harm: number }

type Settled = { readonly answered: Flowed } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = FLOW.safeParse(reading)
  if (!held.success) return { refused: `a turn of mana reads so: ${z.prettifyError(held.error)}` }
  const { mana, maxMana, spirit, spent, taken, hoursAwake, hoursAsleep } = held.data
  const regained = Math.floor(
    spirit * REGAINED_PER_SPIRIT_HOUR * (hoursAwake + hoursAsleep * ASLEEP_MULTIPLIER)
  )
  const reached = mana - spent + taken + regained
  const burned = Math.max(0, mana - spent + taken - maxMana)
  return {
    answered: {
      mana: Math.min(maxMana, Math.max(0, reached)),
      burned,
      harm: Math.ceil(burned * HARM_PER_BURNED),
    },
  }
}
