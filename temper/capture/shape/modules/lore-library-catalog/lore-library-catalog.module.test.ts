import { expect, test } from "bun:test"
import type {
  LoreLibraryCatalogBook,
  LoreLibraryCatalogCategory,
  LoreLibraryCatalogCollection,
} from "akasha/temper/capture/shape/modules/lore-library-catalog/lore-library-catalog.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { z } from "zod"

const loreLibraryBookSchema = z
  .object({
    name: z.string(),
  })
  .strict()

const loreLibraryCollectionSchema = z
  .object({
    name: z.string(),
    books: z.record(z.coerce.number(), loreLibraryBookSchema),
  })
  .strict()

const loreLibraryCategorySchema = z
  .object({
    name: z.string(),
    collections: z.record(z.coerce.number(), loreLibraryCollectionSchema),
  })
  .strict()

const loreLibraryCatalogSchema = z.record(z.coerce.number(), loreLibraryCategorySchema)

test("each lore library catalog schema infers exactly its level of the lore library catalog shape", () => {
  expect(
    assertSchemaMatchesPayload<typeof loreLibraryBookSchema, LoreLibraryCatalogBook>()
  ).toBeUndefined()
  expect(
    assertSchemaMatchesPayload<typeof loreLibraryCollectionSchema, LoreLibraryCatalogCollection>()
  ).toBeUndefined()
  expect(
    assertSchemaMatchesPayload<typeof loreLibraryCategorySchema, LoreLibraryCatalogCategory>()
  ).toBeUndefined()
  expect(
    assertSchemaMatchesPayload<
      typeof loreLibraryCatalogSchema,
      Record<number, LoreLibraryCatalogCategory>
    >()
  ).toBeUndefined()
})
