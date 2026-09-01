import { z } from "zod"

export const ROUND_MODES = ["none", "round", "floor", "ceil", "tenths"] as const
export const RoundModeSchema = z.enum(ROUND_MODES)
export type RoundMode = z.infer<typeof RoundModeSchema>

export const AttributeDefSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
  })
  .strict()
export type AttributeDef = z.infer<typeof AttributeDefSchema>

export const AttrTermSchema = z.object({ attr: z.string(), coef: z.number() }).strict()
export type AttrTerm = z.infer<typeof AttrTermSchema>

export const EquipTermSchema = z
  .object({ slot: z.string(), stat: z.string(), coef: z.number() })
  .strict()
export type EquipTerm = z.infer<typeof EquipTermSchema>

export const LinearFormSchema = z
  .object({
    terms: z.array(AttrTermSchema).default([]),
    equip: z.array(EquipTermSchema).default([]),
    constant: z.number().default(0),
    round: RoundModeSchema.default("none"),
  })
  .strict()
export type LinearForm = z.infer<typeof LinearFormSchema>

export const DerivedStatSchema = LinearFormSchema.extend({ id: z.string() })
export type DerivedStat = z.infer<typeof DerivedStatSchema>

export const PowerSourceSchema = z.union([
  z.object({ derived: z.string() }).strict(),
  z.object({ form: LinearFormSchema }).strict(),
])
export type PowerSource = z.infer<typeof PowerSourceSchema>

export const AttackModeSchema = z
  .object({ id: z.string(), power: PowerSourceSchema, defense: z.string() })
  .strict()
export type AttackMode = z.infer<typeof AttackModeSchema>

export const DiceSystemSchema = z
  .object({
    id: z.string(),
    sides: z.number().int().positive(),
    count: z.number().int().positive(),
    critOn: z.enum(["maxTotal", "none"]).default("maxTotal"),
    fumbleOn: z.enum(["minTotal", "none"]).default("minTotal"),
  })
  .strict()
export type DiceSystem = z.infer<typeof DiceSystemSchema>

export const BandConditionSchema = z.union([
  z.object({ flag: z.enum(["crit", "fumble"]) }).strict(),
  z.object({ marginGte: z.number() }).strict(),
  z.object({ marginGt: z.number() }).strict(),
  z.object({ always: z.literal(true) }).strict(),
])
export type BandCondition = z.infer<typeof BandConditionSchema>

export const BandScaleSchema = z
  .object({
    marginFloor: z.number().optional(),
    mult: z.number().default(1),
    flat: z.number().optional(),
  })
  .strict()
export type BandScale = z.infer<typeof BandScaleSchema>

export const ResolutionBandSchema = z
  .object({
    id: z.string(),
    when: BandConditionSchema,
    result: z.enum(["hit", "miss"]),
    scale: BandScaleSchema.optional(),
  })
  .strict()
export type ResolutionBand = z.infer<typeof ResolutionBandSchema>

export const ResolutionRulesSchema = z
  .object({
    intentClamp: z.object({ min: z.number(), max: z.number() }).strict(),
    gate: z.object({ default: z.number(), min: z.number() }).strict(),
    marginDivisor: z.number(),
    round: RoundModeSchema.default("tenths"),
    damageFloor: z.number().default(1),
    bands: z.array(ResolutionBandSchema),
  })
  .strict()
export type ResolutionRules = z.infer<typeof ResolutionRulesSchema>

export const LadderSchema = z.object({ id: z.string(), ranks: z.array(z.string()) }).strict()
export type Ladder = z.infer<typeof LadderSchema>

export const LevelingSchema = z
  .object({
    type: z.enum(["flat"]),
    perFloor: z.number().default(1),
    attributePointsPerLevel: z.number().optional(),
  })
  .strict()
export type Leveling = z.infer<typeof LevelingSchema>

export const ProgressionSchema = z
  .object({
    leveling: LevelingSchema,
    ladders: z.array(LadderSchema).default([]),
    cardVocab: z.array(z.string()).default([]),
  })
  .strict()
export type Progression = z.infer<typeof ProgressionSchema>

export const RulebookSchema = z
  .object({
    systemType: z.string(),
    summary: z.string().optional(),
    attributes: z.array(AttributeDefSchema).default([]),
    derivedStats: z.array(DerivedStatSchema).default([]),
    attackModes: z.array(AttackModeSchema).default([]),
    diceSystems: z.array(DiceSystemSchema).default([]),
    defaultDiceSystem: z.string().optional(),
    resolution: ResolutionRulesSchema.optional(),
    progression: ProgressionSchema.optional(),
  })
  .strict()
export type Rulebook = z.infer<typeof RulebookSchema>

export function parseRulebookMechanics(gameRulebook: unknown): Rulebook | null {
  if (typeof gameRulebook !== "object" || gameRulebook === null) return null
  const mechanics = Reflect.get(gameRulebook, "mechanics")
  if (mechanics === undefined) return null
  return RulebookSchema.parse(mechanics)
}
