import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type {
  LoreLibraryCatalogBook,
  LoreLibraryCatalogCategory,
  LoreLibraryCatalogCollection,
} from "@akasha/temper-capture-shapes/lore-library-catalog"
import { z } from "zod"

export const loreLibraryBookSchema = z
  .object({
    name: z.string(),
  })
  .strict()

export const loreLibraryCollectionSchema = z
  .object({
    name: z.string(),
    books: z.record(z.coerce.number(), loreLibraryBookSchema),
  })
  .strict()

export const loreLibraryCategorySchema = z
  .object({
    name: z.string(),
    collections: z.record(z.coerce.number(), loreLibraryCollectionSchema),
  })
  .strict()

assertSchemaMatchesPayload<typeof loreLibraryBookSchema, LoreLibraryCatalogBook>()
assertSchemaMatchesPayload<typeof loreLibraryCollectionSchema, LoreLibraryCatalogCollection>()
assertSchemaMatchesPayload<typeof loreLibraryCategorySchema, LoreLibraryCatalogCategory>()

export const loreLibraryCatalogSchema = z.record(z.coerce.number(), loreLibraryCategorySchema)

export type LoreLibraryCatalog = z.infer<typeof loreLibraryCatalogSchema>
