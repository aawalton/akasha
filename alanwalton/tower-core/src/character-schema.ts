import { z } from "zod"

export const ATTR_KEYS = [
  "MIGHT",
  "FINESSE",
  "VITALITY",
  "INTELLECT",
  "PERCEPTION",
  "WILL",
  "PRESENCE",
  "LUCK",
] as const

export const AttributesSchema = z.object({
  MIGHT: z.number(),
  FINESSE: z.number(),
  VITALITY: z.number(),
  INTELLECT: z.number(),
  PERCEPTION: z.number(),
  WILL: z.number(),
  PRESENCE: z.number(),
  LUCK: z.number(),
})
export type Attributes = z.infer<typeof AttributesSchema>

export const CharacterSkillSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    ladder: z.string().optional(),
    rung: z.string().optional(),
    displayed: z.number().optional(),
    score: z.number().optional(),
    rungBand: z.string().optional(),
    source: z.string().optional(),
    effect: z.string().optional(),
  })
  .passthrough()
export type CharacterSkill = z.infer<typeof CharacterSkillSchema>

export const CharacterAffinitySchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    ladder: z.string().optional(),
    tier: z.string().optional(),
    counter: z.number().optional(),
    cap: z.number().optional(),
    type: z.string().optional(),
    source: z.string().optional(),
    effect: z.string().optional(),
  })
  .passthrough()
export type CharacterAffinity = z.infer<typeof CharacterAffinitySchema>

export const CharacterTraitSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    source: z.string().optional(),
    effect: z.string().optional(),
  })
  .passthrough()
export type CharacterTrait = z.infer<typeof CharacterTraitSchema>

export const EquipmentItemSchema = z
  .object({
    name: z.string().optional(),
    atk: z.number().optional(),
    def: z.number().optional(),
    note: z.string().optional(),
  })
  .passthrough()
export type EquipmentItem = z.infer<typeof EquipmentItemSchema>

export const EquipmentSchema = z
  .object({
    weapon: EquipmentItemSchema.nullish(),
    armor: EquipmentItemSchema.nullish(),
    items: z.array(EquipmentItemSchema).optional(),
  })
  .passthrough()
export type Equipment = z.infer<typeof EquipmentSchema>

export const GameCharacterSheetSchema = z
  .object({
    name: z.string(),
    kind: z.enum(["player", "enemy", "ally"]),
    level: z.number(),
    class: z.string().optional(),
    rollMode: z.enum(["2d10", "1d20"]).optional(),
    attributes: AttributesSchema,
    skills: z.array(CharacterSkillSchema).optional(),
    titles: z.array(z.unknown()).optional(),
    affinities: z.array(CharacterAffinitySchema).optional(),
    equipment: EquipmentSchema.optional(),
    traits: z.array(CharacterTraitSchema).optional(),
  })
  .passthrough()
export type GameCharacterSheet = z.infer<typeof GameCharacterSheetSchema>

export function parseGameCharacterSheet(raw: string): GameCharacterSheet {
  return GameCharacterSheetSchema.parse(JSON.parse(raw))
}
