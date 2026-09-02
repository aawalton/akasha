import type { DataMiningPayload } from "@akasha/temper-capture-datamining/datamining-payload"
import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import { savedVariablesRootSchema as captureRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"

export const setBonusSchema = z
  .object({
    numRequired: z.number(),
    description: z.string(),
    isPerfected: z.boolean(),
  })
  .strict()

export const minedItemSchema = z
  .object({
    name: z.string(),
    icon: z.string(),
    itemType: z.number(),
    specializedItemType: z.number(),
    equipType: z.number(),
    weaponType: z.number(),
    armorType: z.number(),
    weaponPower: z.number(),
    armorRating: z.number(),
    requiredLevel: z.number(),
    requiredCP: z.number(),
    value: z.number(),
    quality: z.number(),
    style: z.number(),
    filterType: z.number(),
    filterTypeSpecific: z.number(),
    isUnique: z.boolean(),
    isUniqueEquipped: z.boolean(),
    enchantHeader: z.string(),
    enchantDescription: z.string(),
    hasOnUseAbility: z.boolean(),
    abilityHeader: z.string(),
    abilityDescription: z.string(),
    abilityCooldown: z.number(),
    traitType: z.number(),
    traitDescription: z.string(),
    hasSet: z.boolean(),
    setId: z.number(),
    setName: z.string(),
    setMaxEquip: z.number(),
    setBonuses: luaArrayOrEmpty(setBonusSchema),
    flavorText: z.string(),
  })
  .strict()

export const minedQuestSchema = z
  .object({
    name: z.string(),
    questType: z.number(),
    repeatableType: z.number(),
    zoneId: z.number(),
    zoneName: z.string(),
  })
  .strict()

const miningStatsSchema = z
  .object({
    totalProcessed: z.number(),
    equipmentFound: z.number(),
    startTime: z.number(),
  })
  .strict()

const questMiningStatsSchema = z
  .object({
    totalMined: z.number(),
    startTime: z.number(),
    endTime: z.number(),
  })
  .strict()

export const dataminingAccountWideSchema = z
  .object({
    version: z.number().optional(),
    items: z.record(z.coerce.number(), minedItemSchema).optional(),
    nextItemId: z.number().optional(),
    isRunning: z.boolean().optional(),
    consecutiveMisses: z.number().optional(),
    completed: z.boolean().optional(),
    stats: miningStatsSchema.optional(),
    quests: z.record(z.coerce.number(), minedQuestSchema).optional(),
    questNextId: z.number().optional(),
    questIsRunning: z.boolean().optional(),
    questConsecutiveMisses: z.number().optional(),
    questCompleted: z.boolean().optional(),
    questStats: questMiningStatsSchema.optional(),
    apiVersion: z.string().optional(),
  })
  .strict()

assertSchemaMatchesPayload<typeof dataminingAccountWideSchema, DataMiningPayload>()

export const rootSchema = captureRootSchema(dataminingAccountWideSchema)

export type SavedVariablesRoot = z.infer<typeof rootSchema>
