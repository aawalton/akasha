import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type { ZoneCompletionCatalogZone } from "@akasha/temper-capture-shapes/zone-completion-catalog"
import { z } from "zod"

const zoneCompletionCatalogActivitySchema = z
  .object({
    name: z.string(),
    activityId: z.number(),
  })
  .strict()

const zoneCompletionCatalogTypeSchema = z
  .object({
    activities: z.record(z.number(), zoneCompletionCatalogActivitySchema),
  })
  .strict()

const zoneCompletionCatalogZoneSchema = z
  .object({
    name: z.string(),
    completionTypes: z.record(z.number(), zoneCompletionCatalogTypeSchema),
  })
  .strict()

export const zoneCompletionCatalogSchema = z.record(z.number(), zoneCompletionCatalogZoneSchema)

assertSchemaMatchesPayload<
  typeof zoneCompletionCatalogSchema,
  Record<number, ZoneCompletionCatalogZone>
>()
