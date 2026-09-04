import { z } from "zod"
import {
  type SchemaViolation,
  toViolations,
} from "../schema-violation/schema-violation.module.code.ts"

export const FOG_REPORT_SEATS = ["resolver", "worldbuilder", "loremaker"] as const

export const FOG_REF_KINDS = ["entity", "turn", "pool", "section", "roll", "state"] as const

export const FogRefSchema = z
  .object({
    kind: z.enum(FOG_REF_KINDS),
    slug: z.string().min(1),
  })
  .strict()
export type FogRef = z.infer<typeof FogRefSchema>

export const FogReportSchema = z
  .object({
    seat: z.enum(FOG_REPORT_SEATS),
    counts: z.record(z.string(), z.number().int().nonnegative()).default({}),
    refs: z.array(FogRefSchema).default([]),
    gmOnly: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()
export type FogReport = z.infer<typeof FogReportSchema>

export type FogReportResult =
  | { readonly ok: true; readonly value: FogReport }
  | { readonly ok: false; readonly violations: readonly SchemaViolation[] }

export function validateFogReport(input: unknown): FogReportResult {
  const parsed = FogReportSchema.safeParse(input)
  if (parsed.success) return { ok: true, value: parsed.data }
  return { ok: false, violations: toViolations(parsed.error) }
}
