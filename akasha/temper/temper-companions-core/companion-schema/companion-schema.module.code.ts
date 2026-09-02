import * as z from "zod"
import { companionArmorSlots } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import { companionBaseRoles } from "../companion-base-roles/companion-base-roles.module.code.ts"
import { companionEquipmentQualities } from "../companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import { companionJewelrySlots } from "../companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import { companionSkillSlots } from "../companion-skill-slots/companion-skill-slots.module.code.ts"
import { companionSkills } from "../companion-skills/companion-skills.module.code.ts"
import { companionTraits } from "../companion-traits/companion-traits.module.code.ts"
import { companionWeaponSlots } from "../companion-weapon-slots/companion-weapon-slots.module.code.ts"
import { companionWeaponTypes } from "../companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "../companions/companions.module.code.ts"

const companionArmorWeightSchema = z.enum(["no-weight", "light", "medium", "heavy"])

const companionArmorItemSchema = z.object({
  type: z.enum(companionArmorSlots.ids),
  weight: companionArmorWeightSchema,
  trait: z.enum(companionTraits.ids),
  quality: z.enum(companionEquipmentQualities.ids),
})

const companionArmorSlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("armor"), data: companionArmorItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const companionJewelryItemSchema = z.object({
  type: z.enum(companionJewelrySlots.ids),
  trait: z.enum(companionTraits.ids),
  quality: z.enum(companionEquipmentQualities.ids),
})

const companionJewelrySlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("jewelry"), data: companionJewelryItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const companionWeaponItemSchema = z.object({
  slot: z.enum(companionWeaponSlots.ids),
  type: z.enum(companionWeaponTypes.ids),
  trait: z.enum(companionTraits.ids),
  quality: z.enum(companionEquipmentQualities.ids),
})

const companionWeaponSlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("weapon"), data: companionWeaponItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const companionEquipmentSchema = z.object({
  armor: z.record(z.enum(companionArmorSlots.ids), companionArmorSlotItemSchema),
  jewelry: z.record(z.enum(companionJewelrySlots.ids), companionJewelrySlotItemSchema),
  weapons: z.record(z.enum(companionWeaponSlots.ids), companionWeaponSlotItemSchema),
})

const companionSkillBarRecordSchema = z.record(
  z.enum(companionSkillSlots.ids),
  z.enum(companionSkills.ids)
)

const companionSkillsSchema = z.object({
  "skill-bar": companionSkillBarRecordSchema,
})

const baseRoleValueSchema = z
  .union([
    z.enum(companionBaseRoles.ids),
    z.literal("damage-support"),
    z.literal("toughness-support"),
  ])
  .transform((v) =>
    v === "damage-support" || v === "toughness-support" ? ("support" as const) : v
  )

const companionSchema = z
  .object({
    id: z.enum(companions.ids),
    baseRoles: z.array(baseRoleValueSchema).optional(),
    roles: z.array(baseRoleValueSchema).optional(),
  })
  .transform((data) => ({
    id: data.id,
    baseRoles: [...new Set(data.baseRoles ?? data.roles ?? [])],
  }))

const companionTargetSchema = z.object({
  armor: z.enum(["overland", "dungeon"]),
  targetCount: z.number().min(1).max(6).default(1),
  targetHealth: z.enum(["full", "execute"]).default("full"),
})

export const companionStateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isTestBuild: z.boolean().optional(),
  testCategory: z.enum(["class-skills", "shared-skills"]).optional(),
  companion: companionSchema,
  equipment: companionEquipmentSchema,
  skills: companionSkillsSchema,
  target: companionTargetSchema,
})
