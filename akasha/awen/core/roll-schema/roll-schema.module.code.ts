import { z } from "zod"

export const DiceTermSchema = z
  .object({
    count: z.number().int().positive(),
    sides: z.number().int().positive(),
    keep: z
      .object({ mode: z.enum(["high", "low"]), n: z.number().int().positive() })
      .strict()
      .optional(),
  })
  .strict()
export type DiceTerm = z.infer<typeof DiceTermSchema>

export const ParsedDiceSchema = z
  .object({
    terms: z.array(DiceTermSchema).min(1),
    modifier: z.number().int(),
    source: z.string(),
  })
  .strict()
export type ParsedDice = z.infer<typeof ParsedDiceSchema>

export const TermResultSchema = z
  .object({
    count: z.number().int().positive(),
    sides: z.number().int().positive(),
    rolled: z.array(z.number().int().positive()),
    kept: z.array(z.number().int().positive()),
    subtotal: z.number().int(),
  })
  .strict()
export type TermResult = z.infer<typeof TermResultSchema>

export const RollOutcomeSchema = z
  .object({
    terms: z.array(TermResultSchema).min(1),
    modifier: z.number().int(),
    total: z.number().int(),
  })
  .strict()
export type RollOutcome = z.infer<typeof RollOutcomeSchema>

export const RollRecordSchema = z
  .object({
    kind: z.literal("roll").default("roll"),
    gameExternalId: z.string(),
    turn: z.number().int().optional(),
    label: z.string().optional(),
    sessionNumber: z.number().int().positive().optional(),
    expression: z.string(),
    seed: z.string(),
    result: z.number().int(),
    outcome: RollOutcomeSchema,
    prevHash: z.string().nullable(),
    hash: z.string(),
  })
  .strict()
export type RollRecord = z.infer<typeof RollRecordSchema>

export type RollRecordHashable = Omit<RollRecord, "hash" | "kind">

export const ResolutionMechanismSchema = z
  .object({
    verb: z.string(),
    defaultDice: z.string().optional(),
    convention: z.string().optional(),
  })
  .strict()
export type ResolutionMechanism = z.infer<typeof ResolutionMechanismSchema>

export function parseResolutionMechanism(value: unknown): ResolutionMechanism | null {
  if (typeof value !== "object" || value === null) return null
  return ResolutionMechanismSchema.parse(value)
}
