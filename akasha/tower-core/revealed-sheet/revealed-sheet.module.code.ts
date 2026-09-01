import { z } from "zod"
import {
  AttributesSchema,
  type GameCharacterSheet,
} from "../character-schema/character-schema.module.code.ts"

export const HudSchema = z.object({
  level: z.number(),
  class: z.string().optional(),
  tier: z.string().optional(),
  hp: z.number(),
  hpMax: z.number(),
  focus: z.number(),
  focusMax: z.number(),
  stamina: z.number(),
  stamMax: z.number(),
  delta: z
    .object({
      hp: z.number().optional(),
      focus: z.number().optional(),
      stamina: z.number().optional(),
      level: z.number().optional(),
    })
    .optional(),
  attrPoints: z.number().optional(),
})
export type Hud = z.infer<typeof HudSchema>

export const RevealedSkillSchema = z.object({
  name: z.string().optional(),
  rung: z.string().optional(),
  score: z.number().optional(),
  note: z.string().optional(),
  new: z.boolean().optional(),
})
export type RevealedSkill = z.infer<typeof RevealedSkillSchema>

export const RevealedAffinitySchema = z.object({
  name: z.string().optional(),
  value: z.number().optional(),
  note: z.string().optional(),
  new: z.boolean().optional(),
})
export type RevealedAffinity = z.infer<typeof RevealedAffinitySchema>

export const RevealedEquipSlotSchema = z.object({
  name: z.string().optional(),
  atk: z.number().optional(),
  def: z.number().optional(),
  note: z.string().optional(),
})
export type RevealedEquipSlot = z.infer<typeof RevealedEquipSlotSchema>

export const RevealedInventoryItemSchema = z.object({
  name: z.string().optional(),
  note: z.string().optional(),
  new: z.boolean().optional(),
})
export type RevealedInventoryItem = z.infer<typeof RevealedInventoryItemSchema>

export const RevealedSheetSchema = z.object({
  attributes: AttributesSchema,
  derived: z.record(z.string(), z.number()).optional(),
  class: z.string().optional(),
  skills: z.array(RevealedSkillSchema).optional(),
  titles: z.array(z.unknown()).optional(),
  affinities: z.array(RevealedAffinitySchema).optional(),
  inventory: z.array(RevealedInventoryItemSchema).optional(),
  equipment: z.record(z.string(), RevealedEquipSlotSchema).optional(),
  delta: z.record(z.string(), z.unknown()).optional(),
  attrInfo: z.record(z.string(), z.string()).optional(),
})
export type RevealedSheet = z.infer<typeof RevealedSheetSchema>

export function toRevealedSheet(canonical: GameCharacterSheet): RevealedSheet {
  const equipment: Record<string, RevealedEquipSlot> = {}
  const weapon = canonical.equipment?.weapon
  const armor = canonical.equipment?.armor
  if (weapon != null) {
    equipment.mainHand = { name: weapon.name, atk: weapon.atk }
  }
  if (armor != null) {
    equipment.cloak = { name: armor.name, def: armor.def }
  }
  return RevealedSheetSchema.parse({
    attributes: canonical.attributes,
    class: canonical.class,
    titles: canonical.titles ?? [],
    skills: (canonical.skills ?? []).map((s) => ({
      name: s.name,
      rung: s.rung,
      score: s.displayed ?? s.score,
    })),
    affinities: (canonical.affinities ?? []).map((a) => ({
      name: a.name,
      value: a.counter,
    })),
    ...(Object.keys(equipment).length > 0 ? { equipment } : {}),
  })
}
