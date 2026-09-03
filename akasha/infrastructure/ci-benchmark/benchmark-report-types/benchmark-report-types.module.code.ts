import { z } from "zod"

export const BenchmarkPhaseSchema = z.enum(["cold-stage", "warm-prep", "check"])
export type BenchmarkPhase = z.infer<typeof BenchmarkPhaseSchema>

export const StoreVariantSchema = z.enum(["disk", "memory"])
export type StoreVariant = z.infer<typeof StoreVariantSchema>

export const StepTimingSchema = z
  .object({
    name: z.string(),
    phase: BenchmarkPhaseSchema,
    durationMs: z.number().nonnegative(),
    exitCode: z.number().int(),
    image: z.string(),
    skipped: z.boolean(),
  })
  .strict()
export type StepTiming = z.infer<typeof StepTimingSchema>

export const InnerReportSchema = z
  .object({
    node: z.string(),
    store: StoreVariantSchema,
    targetSha: z.string(),
    wallClockMs: z.number().nonnegative(),
    steps: z.array(StepTimingSchema),
    preludeExcludedFromColdStage: z.literal(true),
  })
  .strict()
export type InnerReport = z.infer<typeof InnerReportSchema>
