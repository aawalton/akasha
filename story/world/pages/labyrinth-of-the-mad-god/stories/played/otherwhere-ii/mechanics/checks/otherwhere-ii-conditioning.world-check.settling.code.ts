import { z } from "zod"

const CAPS = { E: 10, D: 25 } as const

const CAP_BONUS = { E: 1, D: 5 } as const

const FITTING = {
  strength: ["deadly-battle", "long-training"],
  dexterity: ["deadly-battle", "long-training"],
  toughness: ["deadly-battle", "long-training"],
  magic: ["mana-practice"],
  mind: ["study"],
  creativity: ["study"],
  charisma: ["social-stakes"],
} as const

const ORDEAL = z.object({
  character: z.string().trim().min(1),
  attribute: z.enum([
    "strength",
    "dexterity",
    "toughness",
    "magic",
    "mind",
    "creativity",
    "charisma",
  ]),
  baseline: z.number().int().min(0),
  ordeal: z.enum(["deadly-battle", "long-training", "mana-practice", "study", "social-stakes"]),
  grade: z.enum(["E", "D"]).default("E"),
})

type Conditioned = {
  readonly rises: boolean
  readonly baseline: number
  readonly capBonus: number
}

type Settled = { readonly answered: Conditioned } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = ORDEAL.safeParse(reading)
  if (!held.success) return { refused: `an ordeal reads so: ${z.prettifyError(held.error)}` }
  const { attribute, baseline, ordeal, grade } = held.data
  const fits = (FITTING[attribute] as readonly string[]).includes(ordeal)
  if (!fits || baseline >= CAPS[grade]) return { answered: { rises: false, baseline, capBonus: 0 } }
  const raised = baseline + 1
  const capBonus = raised === CAPS[grade] ? CAP_BONUS[grade] : 0
  return { answered: { rises: true, baseline: raised, capBonus } }
}
