import { z } from "zod"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CharacterToggleName,
  CompanionAutomationToggles,
  CompanionToggleName,
} from "../automation-toggles/automation-toggles.module.code.ts"

const CHARACTER_TOGGLE_FIELDS = {
  equipment: z.boolean().optional(),
  lockWornGear: z.boolean().optional(),
  food: z.boolean().optional(),
  potions: z.boolean().optional(),
  skills: z.boolean().optional(),
  championPoints: z.boolean().optional(),
  attributes: z.boolean().optional(),
  soulGems: z.boolean().optional(),
  repairKits: z.boolean().optional(),
  recharge: z.boolean().optional(),
  repair: z.boolean().optional(),
  lockpicks: z.boolean().optional(),
  experienceScrolls: z.boolean().optional(),
  dailyWrits: z.boolean().optional(),
  dailyWritBlacksmithing: z.boolean().optional(),
  dailyWritClothier: z.boolean().optional(),
  dailyWritWoodworking: z.boolean().optional(),
  dailyWritJewelrycrafting: z.boolean().optional(),
  dailyWritEnchanting: z.boolean().optional(),
  dailyWritAlchemy: z.boolean().optional(),
  dailyWritProvisioning: z.boolean().optional(),
  dailyWritAutoCraft: z.boolean().optional(),
  masterWrits: z.boolean().optional(),
  masterWritBlacksmithing: z.boolean().optional(),
  masterWritClothier: z.boolean().optional(),
  masterWritWoodworking: z.boolean().optional(),
  masterWritJewelrycrafting: z.boolean().optional(),
  masterWritEnchanting: z.boolean().optional(),
  masterWritAlchemy: z.boolean().optional(),
  masterWritProvisioning: z.boolean().optional(),
} satisfies Record<CharacterToggleName, z.ZodOptional<z.ZodBoolean>>

const COMPANION_TOGGLE_FIELDS = {
  equipment: z.boolean().optional(),
  skills: z.boolean().optional(),
} satisfies Record<CompanionToggleName, z.ZodOptional<z.ZodBoolean>>

const CharacterTogglesShape: z.ZodType<CharacterAutomationToggles> = z
  .object(CHARACTER_TOGGLE_FIELDS)
  .passthrough()

const CompanionTogglesShape: z.ZodType<CompanionAutomationToggles> = z
  .object(COMPANION_TOGGLE_FIELDS)
  .passthrough()

export const AutomationSettingsShape: z.ZodType<AutomationSettings> = z
  .object({
    global: z
      .object({
        characters: CharacterTogglesShape.optional(),
        companions: CompanionTogglesShape.optional(),
      })
      .passthrough()
      .optional(),
    characters: z.record(z.string(), CharacterTogglesShape),
    companions: z.record(z.string(), CompanionTogglesShape),
  })
  .passthrough()

export function automationSettingsFrom(said: unknown): AutomationSettings {
  return AutomationSettingsShape.parse(said)
}
