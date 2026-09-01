import { z } from "zod"
import {
  type SchemaViolation,
  toViolations,
} from "../schema-violation/schema-violation.module.code.ts"

export const PoolChangeSchema = z
  .object({
    pool: z.string().min(1),
    delta: z.number(),
    newTotal: z.number(),
  })
  .strict()
export type PoolChange = z.infer<typeof PoolChangeSchema>

export const TurnPackageSchema = z
  .object({
    playerAction: z.string().min(1),
    worldResponse: z.string().min(1),
    poolChanges: z.array(PoolChangeSchema).default([]),
    gmOnly: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()
export type TurnPackage = z.infer<typeof TurnPackageSchema>

export type TurnPackageResult =
  | { readonly ok: true; readonly value: TurnPackage }
  | { readonly ok: false; readonly violations: readonly SchemaViolation[] }

export function validateTurnPackage(input: unknown): TurnPackageResult {
  const parsed = TurnPackageSchema.safeParse(input)
  if (parsed.success) return { ok: true, value: parsed.data }
  return { ok: false, violations: toViolations(parsed.error) }
}
