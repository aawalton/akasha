import type { ShoppingPlan } from "@akasha/temper-shopping/ttc-shopping-types"
import { ttcListingEntrySchema } from "@akasha/temper-trading-pricing/ttc-listing-schema"
import type { TTCListingEntry } from "@akasha/temper-trading-pricing/ttc-listing-types"
import { z } from "zod"

const listingSchema = z.custom<TTCListingEntry>(
  (val) => ttcListingEntrySchema.safeParse(val).success
)

const itemBudgetSchema = z
  .object({
    key: z.string(),
    ceiling: z.number(),
    cheapestPrice: z.number(),
    multiplier: z.number(),
    strategy: z.enum(["Tight", "Normal", "Loose", "Scarce"]),
  })
  .strict()

const purchaseRecommendationSchema = z
  .object({
    key: z.string(),
    listing: listingSchema,
    unitPrice: z.number(),
  })
  .strict()

const taggedListingSchema = z
  .object({
    key: z.string(),
    listing: listingSchema,
    unitPrice: z.number(),
  })
  .strict()

export const shoppingPlanSchema = z
  .object({
    purchases: z.array(purchaseRecommendationSchema),
    locations: z.array(z.string()),
    totalCost: z.number(),
    missingItems: z.array(z.string()),
    budgets: z.array(itemBudgetSchema),
    alternatives: z.record(z.string(), z.array(taggedListingSchema)),
  })
  .strict() satisfies z.ZodType<ShoppingPlan>
