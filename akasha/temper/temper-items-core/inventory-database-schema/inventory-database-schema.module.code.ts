import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import { z } from "zod"
import type { InventoryDatabase } from "../inventory-types/inventory-types.module.code.ts"

const itemSchema = z
  .object({
    itemId: z.number(),
    itemName: z.string(),
    itemLink: z.string(),
    quality: z.number(),
    filterType: z.number(),
    itemType: z.number(),
    specializedItemType: z.number().optional(),
    traitType: z.number(),
    equipType: z.number().optional(),
    weaponType: z.number().optional(),
    armorType: z.number().optional(),
    furnitureCategory: z.string().optional(),
    furnitureCategoryId: z.number().optional(),
    furnitureSubcategoryId: z.number().optional(),
    setId: z.number().optional(),
    isContainer: z.boolean().optional(),
    requiredLevel: z.number(),
    requiredCP: z.number(),
    stackCount: z.number(),
    maxStackSize: z.number().optional(),
    saleAvg: z.number().optional(),
    minPrice: z.number().optional(),
    amountCount: z.number().optional(),
    saleAmountCount: z.number().optional(),
    suggestedPrice: z.number().optional(),
    estimatedValue: z.number().optional(),
    replacementCost: z.number().optional(),
    merchantValue: z.number().optional(),
    stolen: z.boolean().optional(),
    bound: z.boolean().optional(),
    bopTradeable: z.boolean().optional(),
    questRelevant: z.boolean().optional(),
    reconstructed: z.boolean().optional(),
    transmuted: z.boolean().optional(),
    locked: z.boolean().optional(),
    crafted: z.boolean().optional(),
    known: z.boolean().optional(),
  })
  .strict()

const placedFurnishingSchema = z
  .object({
    itemName: z.string(),
    quality: z.number(),
    itemLink: z.string(),
    collectibleLink: z.string(),
    saleAvg: z.number().optional(),
    minPrice: z.number().optional(),
    amountCount: z.number().optional(),
    saleAmountCount: z.number().optional(),
    suggestedPrice: z.number().optional(),
    estimatedValue: z.number().optional(),
  })
  .strict()

const locationSchema = z
  .object({
    bags: z.record(z.number(), z.record(z.number(), itemSchema)),
    bagSizes: z.record(z.number(), z.number()).optional(),
    displayName: z.string(),
    lastScanned: z.number(),
    placedFurnishings: z.record(z.string(), placedFurnishingSchema).optional(),
  })
  .strict()

const currencyBalancesSchema = z.record(z.string(), z.number())

const characterCurrenciesSchema = z
  .object({
    displayName: z.string(),
    lastScanned: z.number(),
    balances: currencyBalancesSchema,
  })
  .strict()

const inventoryCurrenciesSchema = z
  .object({
    characters: z.record(z.string(), characterCurrenciesSchema),
    bank: currencyBalancesSchema.optional(),
    account: currencyBalancesSchema.optional(),
  })
  .strict()

export const inventoryDatabaseSchema = z
  .object({
    locations: z.record(z.string(), locationSchema),
    meta: z
      .object({
        displayName: z.string(),
        worldName: z.string(),
        lastFullScan: z.number(),
        priceSource: z.enum(["ttc", "none"]).optional(),
      })
      .strict(),
    currencies: inventoryCurrenciesSchema.optional(),
    openCooldowns: z.record(z.string(), z.number()).optional(),
    craftingLevels: z.record(z.string(), z.record(z.number(), z.number())).optional(),
    transmuteCrystalCap: z.number().optional(),
    transmuteCrystalAmount: z.number().optional(),
  })
  .strict()

assertSchemaMatchesPayload<typeof inventoryDatabaseSchema, InventoryDatabase>()
