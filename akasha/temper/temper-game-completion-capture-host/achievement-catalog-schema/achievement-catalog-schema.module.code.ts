import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type { AchievementCatalogData } from "@akasha/temper-capture-shapes/achievement-catalog"
import { z } from "zod"

const achievementCatalogEntrySchema = z
  .object({
    name: z.string(),
    points: z.number(),
    totalSteps: z.number(),
    isCharacterSpecific: z.boolean(),
  })
  .strict()

const achievementCatalogSubCategorySchema = z
  .object({
    name: z.string(),
    achievements: z.record(z.number(), achievementCatalogEntrySchema),
  })
  .strict()

const achievementCatalogCategorySchema = z
  .object({
    name: z.string(),
    generalSubCategory: achievementCatalogSubCategorySchema.optional(),
    subCategories: z.record(z.number(), achievementCatalogSubCategorySchema),
  })
  .strict()

export const achievementCatalogSchema = z
  .object({
    categories: z.record(z.number(), achievementCatalogCategorySchema),
  })
  .strict()

assertSchemaMatchesPayload<typeof achievementCatalogSchema, AchievementCatalogData>()
