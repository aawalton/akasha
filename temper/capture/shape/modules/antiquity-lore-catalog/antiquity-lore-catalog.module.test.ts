import { expect, test } from "bun:test"
import type { AntiquityLoreCatalogEntry } from "akasha/temper/capture/shape/modules/antiquity-lore-catalog/antiquity-lore-catalog.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { z } from "zod"

const antiquityLoreCatalogEntrySchema = z
  .object({
    name: z.string(),
    categoryId: z.number(),
    categoryName: z.string(),
    setId: z.number(),
    totalLoreEntries: z.number(),
  })
  .strict()

const antiquityLoreCatalogSchema = z.record(z.coerce.number(), antiquityLoreCatalogEntrySchema)

test("the antiquity lore catalog schema infers exactly the antiquity lore catalog shape", () => {
  expect(
    assertSchemaMatchesPayload<
      typeof antiquityLoreCatalogSchema,
      Record<number, AntiquityLoreCatalogEntry>
    >()
  ).toBeUndefined()
})
