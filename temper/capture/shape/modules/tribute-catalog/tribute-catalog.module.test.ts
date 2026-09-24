import { expect, test } from "bun:test"
import type {
  TributePatronCatalogCard,
  TributePatronCatalogEntry,
} from "akasha/temper/capture/shape/modules/tribute-catalog/tribute-catalog.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { z } from "zod"

const tributePatronCatalogCardSchema = z
  .object({
    baseCardName: z.string(),
    upgradeCardName: z.string(),
  })
  .strict()

const tributePatronCatalogEntrySchema = z
  .object({
    name: z.string(),
    categoryName: z.string(),
    collectibleId: z.number(),
    cards: z.record(z.coerce.number(), tributePatronCatalogCardSchema),
  })
  .strict()

const tributeCatalogSchema = z.record(z.coerce.number(), tributePatronCatalogEntrySchema)

test("each tribute catalog schema infers exactly its level of the tribute catalog shape", () => {
  expect(
    assertSchemaMatchesPayload<typeof tributePatronCatalogCardSchema, TributePatronCatalogCard>()
  ).toBeUndefined()
  expect(
    assertSchemaMatchesPayload<typeof tributePatronCatalogEntrySchema, TributePatronCatalogEntry>()
  ).toBeUndefined()
  expect(
    assertSchemaMatchesPayload<
      typeof tributeCatalogSchema,
      Record<number, TributePatronCatalogEntry>
    >()
  ).toBeUndefined()
})
