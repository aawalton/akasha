import { z } from "zod"

export const GATE_VERDICT_OVERALLS = ["PASS", "PASS-repaired", "REGEN", "EXHAUSTED"] as const
export const GateVerdictOverallSchema = z.enum(GATE_VERDICT_OVERALLS)
export type GateVerdictOverall = z.infer<typeof GateVerdictOverallSchema>

export const GATE_FINDING_VERDICTS = ["clean", "finding", "suspended"] as const
export const GateFindingVerdictSchema = z.enum(GATE_FINDING_VERDICTS)
export type GateFindingVerdict = z.infer<typeof GateFindingVerdictSchema>

export const GateFindingSchema = z
  .object({
    dimension: z.string().min(1),
    verdict: GateFindingVerdictSchema,
    evidence: z.string().min(1),
  })
  .strict()
export type GateFinding = z.infer<typeof GateFindingSchema>

export const GateVerdictSchema = z
  .object({
    overall: GateVerdictOverallSchema,
    turnExternalId: z.string().min(1),
    attempts: z.number().int().nonnegative(),
    findings: z.array(GateFindingSchema).optional(),
    detail: z.record(z.string(), z.unknown()).optional(),
    author: z.string().min(1).optional(),
  })
  .strict()
export type GateVerdict = z.infer<typeof GateVerdictSchema>

export function parseGateVerdict(input: unknown): GateVerdict | null {
  if (input === undefined || input === null) return null
  const parsed = GateVerdictSchema.safeParse(input)
  return parsed.success ? parsed.data : null
}

export interface GateCoverageGaps {
  readonly missing: readonly string[]
  readonly invented: readonly string[]
  readonly duplicate: readonly string[]
}

export function gateVerdictCoverage(
  registryIds: readonly string[],
  findings: readonly GateFinding[] | undefined
): GateCoverageGaps {
  const registry = new Set(registryIds)
  const seen = new Map<string, number>()
  for (const f of findings ?? []) {
    seen.set(f.dimension, (seen.get(f.dimension) ?? 0) + 1)
  }
  const missing = registryIds.filter((id) => !seen.has(id))
  const invented = [...seen.keys()].filter((id) => !registry.has(id))
  const duplicate = registryIds.filter((id) => (seen.get(id) ?? 0) > 1)
  return { missing, invented, duplicate }
}

export function isGateCoverageComplete(gaps: GateCoverageGaps): boolean {
  return gaps.missing.length === 0 && gaps.invented.length === 0 && gaps.duplicate.length === 0
}
