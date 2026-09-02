import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import { z } from "zod"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "../completion-record/completion-record.module.code.ts"

const achievementCriteriaProgressSchema = z
  .object({
    completedSteps: z.number(),
    totalSteps: z.number(),
    criteria: z
      .record(z.string(), z.object({ numCompleted: z.number(), numRequired: z.number() }).strict())
      .optional(),
  })
  .strict()

const accountAchievementProgressSchema = z
  .object({
    completed: z.boolean(),
    completionDate: z.number().optional(),
    criteriaProgress: achievementCriteriaProgressSchema,
  })
  .strict()

const characterAchievementProgressSchema = accountAchievementProgressSchema

const skillMorphVariantSchema = z
  .object({
    name: z.string(),
    rank: z.union([z.number(), z.undefined()]),
  })
  .strict()

const skillMorphDataSchema = z
  .object({
    base: skillMorphVariantSchema,
    morph1: skillMorphVariantSchema,
    morph2: skillMorphVariantSchema,
    currentMorph: z.number(),
    abilityIndex: z.number(),
    isUltimate: z.boolean().optional(),
    atMorph: z.boolean().optional(),
  })
  .strict()

const skillLineProgressSchema = z
  .object({
    currentRank: z.number(),
    currentXP: z.number(),
    nextRankXP: z.number(),
    skills: z.record(z.number(), skillMorphDataSchema).optional(),
  })
  .strict()

const sparseLoreLibrarySchema = z.record(z.number(), z.record(z.number(), z.array(z.number())))
const sparseRecipesSchema = z.record(z.number(), z.array(z.number()))
const sparseAntiquityLoreSchema = z.record(z.number(), z.number())
const sparseZoneCompletionSchema = z.record(z.number(), z.record(z.number(), z.array(z.number())))
const sparsePoiDiscoverySchema = z.record(z.number(), z.array(z.number()))

const grimoireEntrySchema = z.object({ name: z.string(), unlocked: z.boolean() }).strict()
const scriptEntrySchema = z
  .object({ name: z.string(), slot: z.number(), unlocked: z.boolean() })
  .strict()
const scribingProgressSchema = z
  .object({
    grimoires: z.record(z.number(), grimoireEntrySchema),
    scripts: z.record(z.number(), scriptEntrySchema),
  })
  .strict()

const skillPointProgressSchema = z
  .object({
    total: z.number(),
    unassigned: z.number(),
    level: z.number(),
    mainQuests: z.number(),
    tutorial: z.number(),
    foliumDiscognitum: z.number(),
    pvpRank: z.number(),
    maelstromArena: z.number(),
    endlessArchive: z.number(),
    skyshardPoints: z.number(),
    totalSkyshards: z.number(),
    zoneQuestTotal: z.number(),
    groupDungeonTotal: z.number(),
    publicDungeonTotal: z.number(),
    skyshards: z.record(z.string(), z.number()),
    zoneQuests: z.record(z.string(), z.number()),
    groupDungeons: z.record(z.string(), z.number()),
    publicDungeons: z.record(z.string(), z.number()),
  })
  .strict()

const itemSetPieceProgressSchema = z.object({ name: z.string(), unlocked: z.boolean() }).strict()
const itemSetProgressSchema = z
  .object({
    name: z.string(),
    categoryName: z.string().optional(),
    subcategoryName: z.string().optional(),
    slotsUnlocked: z.number(),
    totalSlots: z.number(),
    pieces: z.array(itemSetPieceProgressSchema).readonly().optional(),
  })
  .strict()

const traitResearchTraitSchema = z.object({ name: z.string(), known: z.boolean() }).strict()
const traitResearchLineSchema = z
  .object({ name: z.string(), traits: z.record(z.number(), traitResearchTraitSchema) })
  .strict()
const traitResearchCraftTypeSchema = z
  .object({ name: z.string(), lines: z.record(z.number(), traitResearchLineSchema) })
  .strict()

const mountTrainingProgressSchema = z
  .object({
    speed: z.number(),
    maxSpeed: z.number(),
    stamina: z.number(),
    maxStamina: z.number(),
    carryCapacity: z.number(),
    maxCarryCapacity: z.number(),
  })
  .strict()

const cadwellPoiSchema = z
  .object({
    name: z.string(),
    openingText: z.string(),
    closingText: z.string(),
    order: z.number(),
    discovered: z.boolean(),
    completed: z.boolean(),
  })
  .strict()
const cadwellZoneSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    order: z.number(),
    pois: z.record(z.number(), cadwellPoiSchema),
  })
  .strict()
const cadwellLevelSchema = z.object({ zones: z.record(z.number(), cadwellZoneSchema) }).strict()
const cadwellProgressSchema = z
  .object({
    progressionLevel: z.number(),
    levels: z.record(z.number(), cadwellLevelSchema),
  })
  .strict()

const accountCompletionWriterSchema = z
  .object({
    achievements: z.record(z.number(), accountAchievementProgressSchema),
    itemSets: z.record(z.number(), itemSetProgressSchema).optional(),
    antiquityLore: sparseAntiquityLoreSchema.optional(),
    championPointsEarned: z.number().optional(),
    collectibles: z.array(z.number()).readonly().optional(),
    subclassingSkillLineProgress: z.record(z.number(), skillLineProgressSchema).optional(),
    tributeCardUpgrades: z.record(z.number(), z.array(z.number())).optional(),
    bankUpgrade: z.object({ current: z.number(), max: z.number() }).strict().optional(),
    grandMasterStations: z
      .record(z.number(), z.object({ name: z.string(), unlocked: z.array(z.number()) }).strict())
      .optional(),
  })
  .strict()

const characterCompletionWriterSchema = z
  .object({
    buildHash: z.string().optional(),
    gender: z.number().optional(),
    level: z.number().optional(),
    classId: z.number().optional(),
    allianceId: z.number().optional(),
    raceId: z.number().optional(),
    curseState: z.string().optional(),
    className: z.string().optional(),
    classIcon: z.string().optional(),
    achievements: z.record(z.number(), characterAchievementProgressSchema).optional(),
    skillLineProgress: z.record(z.number(), skillLineProgressSchema).optional(),
    loreLibrary: sparseLoreLibrarySchema.optional(),
    recipes: sparseRecipesSchema.optional(),
    scribing: scribingProgressSchema.optional(),
    skillPoints: skillPointProgressSchema.optional(),
    traitResearch: z.record(z.number(), traitResearchCraftTypeSchema).optional(),
    companionRapport: z.record(z.number(), z.number()).optional(),
    quests: z.array(z.number()).readonly().optional(),
    cadwell: cadwellProgressSchema.optional(),
    zoneCompletion: sparseZoneCompletionSchema.optional(),
    pointsOfInterest: sparsePoiDiscoverySchema.optional(),
    mountTraining: mountTrainingProgressSchema.optional(),
    bagSize: z.number().optional(),
    allianceRank: z.number().optional(),
    dailyWrits: z.object({ date: z.string(), completed: z.number() }).strict().optional(),
  })
  .strict()

const companionCompletionWriterSchema = z
  .object({
    build: z.record(z.string(), z.unknown()).optional(),
    selectedBuild: z.string().optional(),
    targetBuildHash: z.string().optional(),
    level: z.number().optional(),
    currentXP: z.number().optional(),
    rapport: z.number().optional(),
    skillLineProgress: z.record(z.number(), skillLineProgressSchema).optional(),
  })
  .strict()

assertSchemaMatchesPayload<typeof accountCompletionWriterSchema, AccountCompletion>()
assertSchemaMatchesPayload<typeof characterCompletionWriterSchema, CharacterCompletion>()
assertSchemaMatchesPayload<typeof companionCompletionWriterSchema, CompanionCompletion>()
