import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import { z } from "zod"
import type { ListingEntry } from "../listing-types/listing-types.module.code.ts"

export const listingEntrySchema = z
  .object({
    itemLink: z.string(),
    itemName: z.string(),
    stackCount: z.number(),
    price: z.number(),
    pricePerUnit: z.number(),
    sellerName: z.string(),
    timeRemaining: z.number(),
    quality: z.number(),
    capturedAt: z.number(),
  })
  .strict()

assertSchemaMatchesPayload<typeof listingEntrySchema, ListingEntry>()
