import { z } from "zod"

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

export interface TurnPackageViolation {
  readonly field: string
  readonly message: string
}

export type TurnPackageResult =
  | { readonly ok: true; readonly value: TurnPackage }
  | { readonly ok: false; readonly violations: readonly TurnPackageViolation[] }

function toViolations(error: z.ZodError): readonly TurnPackageViolation[] {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "(root)",
    message: issue.message,
  }))
}

export function validateTurnPackage(input: unknown): TurnPackageResult {
  const parsed = TurnPackageSchema.safeParse(input)
  if (parsed.success) return { ok: true, value: parsed.data }
  return { ok: false, violations: toViolations(parsed.error) }
}
