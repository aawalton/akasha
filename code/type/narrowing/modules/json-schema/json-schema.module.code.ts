import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { z } from "zod"

export const JsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonSchema),
    z.record(z.string(), JsonSchema),
  ])
)
