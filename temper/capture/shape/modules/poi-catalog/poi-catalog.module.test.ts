import { expect, test } from "bun:test"
import type { PoiCatalogZone } from "akasha/temper/capture/shape/modules/poi-catalog/poi-catalog.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { z } from "zod"

const poiCatalogEntrySchema = z
  .object({
    name: z.string(),
    poiType: z.number(),
  })
  .strict()

const poiCatalogZoneSchema = z
  .object({
    name: z.string(),
    pois: z.record(z.number(), poiCatalogEntrySchema),
  })
  .strict()

const poiCatalogSchema = z.record(z.number(), poiCatalogZoneSchema)

test("the points of interest catalog schema infers exactly the points of interest catalog shape", () => {
  expect(
    assertSchemaMatchesPayload<typeof poiCatalogSchema, Record<number, PoiCatalogZone>>()
  ).toBeUndefined()
})
