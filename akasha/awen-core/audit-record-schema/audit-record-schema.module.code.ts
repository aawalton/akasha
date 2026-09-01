import { z } from "zod"
import {
  type RollRecordHashable,
  RollRecordSchema,
} from "../roll-schema/roll-schema.module.code.ts"
import { RulebookSchema } from "../rulebook-schema/rulebook-schema.module.code.ts"

export const CombatantDataSchema = z
  .object({
    attributes: z.record(z.string(), z.number()),
    equipment: z.record(z.string(), z.record(z.string(), z.number())).optional(),
    diceSystem: z.string().optional(),
  })
  .strict()
export type CombatantData = z.infer<typeof CombatantDataSchema>

export const RollDataSchema = z
  .object({
    system: z.string(),
    dice: z.array(z.number()),
    total: z.number(),
    crit: z.boolean(),
    fumble: z.boolean(),
  })
  .strict()
export type RollData = z.infer<typeof RollDataSchema>

export const ResolveInputStoredSchema = z
  .object({
    attacker: CombatantDataSchema,
    defender: CombatantDataSchema,
    mode: z.string(),
    baseDamage: z.number(),
    skillBonus: z.number().optional(),
    intent: z.number(),
    gate: z.number().optional(),
  })
  .strict()
export type ResolveInputStored = z.infer<typeof ResolveInputStoredSchema>

export const ResolveResultDataSchema = z
  .object({
    hit: z.boolean(),
    crit: z.boolean(),
    fumble: z.boolean(),
    roll: RollDataSchema,
    attackPower: z.number(),
    intent: z.number(),
    skillBonus: z.number(),
    gate: z.number(),
    effectiveScore: z.number(),
    defense: z.number(),
    margin: z.number(),
    damage: z.number(),
    band: z.string(),
  })
  .strict()
export type ResolveResultData = z.infer<typeof ResolveResultDataSchema>

export const ResolveRecordSchema = z
  .object({
    kind: z.literal("resolve"),
    gameExternalId: z.string(),
    turn: z.number().int().optional(),
    label: z.string().optional(),
    sessionNumber: z.number().int().positive().optional(),
    seed: z.string(),
    input: ResolveInputStoredSchema,
    rulebook: RulebookSchema,
    result: ResolveResultDataSchema,
    prevHash: z.string().nullable(),
    hash: z.string(),
  })
  .strict()
export type ResolveRecord = z.infer<typeof ResolveRecordSchema>

export type ResolveRecordHashable = Omit<ResolveRecord, "hash" | "kind">

export const AuditRecordSchema = z.union([RollRecordSchema, ResolveRecordSchema])
export type AuditRecord = z.infer<typeof AuditRecordSchema>

export type AuditRecordHashable = RollRecordHashable | ResolveRecordHashable
