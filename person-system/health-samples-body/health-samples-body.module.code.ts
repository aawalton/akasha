import { HEALTH_METRIC_UNIT, HEALTH_METRICS } from "@akasha/health-samples-access/sample-shape"
import { z } from "zod"

export const MAX_INGEST_SAMPLES = 1000

const healthSampleSchema = z
  .object({
    metric: z.enum(HEALTH_METRICS),
    startedAt: z.string().datetime({ offset: true }),
    endedAt: z.string().datetime({ offset: true }),
    value: z.number().finite().nonnegative(),
    unit: z.string().min(1),
    sourceName: z.string().min(1),
  })
  .strict()
  .refine((s) => Date.parse(s.endedAt) >= Date.parse(s.startedAt), {
    message: "endedAt precedes startedAt",
    path: ["endedAt"],
  })
  .refine((s) => s.unit === HEALTH_METRIC_UNIT[s.metric], {
    message: "unit does not match the metric's canonical unit",
    path: ["unit"],
  })

export const healthSamplesIngestSchema = z
  .object({
    samples: z.array(healthSampleSchema).min(1).max(MAX_INGEST_SAMPLES),
  })
  .strict()
