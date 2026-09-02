import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type { CollectiblesCatalogData } from "@akasha/temper-capture-shapes/collectibles-catalog"
import { z } from "zod"

const collectiblesCatalogEntrySchema = z
  .object({
    name: z.string(),
    categoryType: z.number(),
  })
  .strict()

const collectiblesCatalogSubCategorySchema = z
  .object({
    name: z.string(),
    collectibles: z.record(z.coerce.number(), collectiblesCatalogEntrySchema),
  })
  .strict()

const collectiblesCatalogCategorySchema = z
  .object({
    name: z.string(),
    generalSubCategory: collectiblesCatalogSubCategorySchema.optional(),
    subCategories: z.record(z.coerce.number(), collectiblesCatalogSubCategorySchema),
  })
  .strict()

export const collectiblesCatalogSchema = z
  .object({
    categories: z.record(z.coerce.number(), collectiblesCatalogCategorySchema),
  })
  .strict()

assertSchemaMatchesPayload<typeof collectiblesCatalogSchema, CollectiblesCatalogData>()
