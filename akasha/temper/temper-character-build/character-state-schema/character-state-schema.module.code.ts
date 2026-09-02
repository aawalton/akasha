import { poisons } from "@akasha/temper-alchemy/poison-source"
import { potions } from "@akasha/temper-alchemy/potion-source"
import { championPoints } from "@akasha/temper-champion-points/champion-point-source"
import { skills } from "@akasha/temper-character-skills/character-skills"
import { scribedSkills } from "@akasha/temper-character-skills/scribed-skills"
import { grimoires } from "@akasha/temper-character-skills/scribing-grimoires"
import { alliances } from "@akasha/temper-character-sources/alliances"
import { characterRoles as roles } from "@akasha/temper-character-sources/character-roles"
import { curses } from "@akasha/temper-character-sources/curses"
import { esoPlus } from "@akasha/temper-character-sources/eso-plus-source"
import { foodOrDrink } from "@akasha/temper-character-sources/food-or-drink-source"
import { mundus } from "@akasha/temper-character-sources/mundus-source"
import { targetArmor } from "@akasha/temper-character-sources/target-armors"
import { vampireStages } from "@akasha/temper-character-sources/vampire-stages"
import { armorEnchants } from "@akasha/temper-characters-equipment/armor-enchants"
import { standardArmorWeights } from "@akasha/temper-characters-equipment/armor-weights"
import { jewelryEnchants } from "@akasha/temper-characters-equipment/jewelry-enchants"
import { setsAll } from "@akasha/temper-characters-equipment/sets-all"
import { weaponEnchantments } from "@akasha/temper-characters-equipment/weapon-enchants"
import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import { classes } from "@akasha/temper-classes/character-class"
import { armorTraits } from "@akasha/temper-equipment/armor-traits"
import { jewelryTraits } from "@akasha/temper-equipment/jewelry-traits"
import { weaponTraits } from "@akasha/temper-equipment/weapon-traits"
import { armorSlots } from "@akasha/temper-equipment-kinds/armor-slots"
import { equipmentQualities } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { jewelrySlots } from "@akasha/temper-equipment-kinds/jewelry-slots"
import { jewelryTypes } from "@akasha/temper-equipment-kinds/jewelry-types"
import { races } from "@akasha/temper-races/races"
import { affixScripts } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import { focusScripts } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { signatureScripts } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import { skillSlots } from "@akasha/temper-skill-kinds/skill-slots"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import * as z from "zod"

const qualityOptionSchema = z.enum(equipmentQualities.ids).optional()
const enchantmentQualitySchema = z
  .enum(["normal", "fine", "superior", "epic", "legendary"] as const)
  .optional()
const itemLevelSchema = z
  .union([
    z.number().min(1).max(50),
    z.enum([
      "CP160",
      "CP150",
      "CP140",
      "CP130",
      "CP120",
      "CP110",
      "CP100",
      "CP90",
      "CP80",
      "CP70",
      "CP60",
      "CP50",
      "CP40",
      "CP30",
      "CP20",
      "CP10",
    ] as const),
  ])
  .optional()

const armorItemSchema = z.object({
  type: z.enum(armorSlots.ids),
  set: z.enum(setsAll.ids),
  trait: z.enum(armorTraits.ids),
  enchantment: z.enum(armorEnchants.ids),
  weight: z.enum(standardArmorWeights.ids),
  quality: qualityOptionSchema,
  enchantmentQuality: enchantmentQualitySchema,
  level: itemLevelSchema,
})

const armorSlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("armor"), data: armorItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const jewelryItemSchema = z.object({
  type: z.enum(jewelryTypes.ids),
  set: z.enum(setsAll.ids),
  trait: z.enum(jewelryTraits.ids),
  enchantment: z.enum(jewelryEnchants.ids),
  quality: qualityOptionSchema,
  enchantmentQuality: enchantmentQualitySchema,
  level: itemLevelSchema,
})

const jewelrySlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("jewelry"), data: jewelryItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const weaponDataSchema = z.object({
  type: z.enum(weaponTypes.ids),
  set: z.enum(setsAll.ids),
  trait: z.enum(weaponTraits.ids),
  enchantment: z.enum(weaponEnchantments.ids),
  poison: z.enum(poisons.ids),
  quality: qualityOptionSchema,
  enchantmentQuality: enchantmentQualitySchema,
  level: itemLevelSchema,
})

const shieldDataSchema = z.object({
  type: z.literal("shield"),
  weight: z.literal("shield"),
  set: z.enum(setsAll.ids),
  trait: z.enum(armorTraits.ids),
  enchantment: z.enum(armorEnchants.ids),
  quality: qualityOptionSchema,
  enchantmentQuality: enchantmentQualitySchema,
  level: itemLevelSchema,
})

const weaponSlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("weapon"), data: weaponDataSchema }),
  z.object({ itemType: z.literal("shield"), data: shieldDataSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const weaponBarSchema = z.object({
  "main-hand": weaponSlotItemSchema,
  "off-hand": weaponSlotItemSchema,
})

const equipmentSchema = z.object({
  armor: z.record(z.enum(armorSlots.ids), armorSlotItemSchema),
  jewelry: z.record(z.enum(jewelrySlots.ids), jewelrySlotItemSchema),
  "primary-weapon-bar": weaponBarSchema,
  "backup-weapon-bar": weaponBarSchema,
})

const skillBarRecordSchema = z.record(z.enum(skillSlots.ids), z.enum(skills.ids))

const skillBarsSchema = z.object({
  "primary-skill-bar": skillBarRecordSchema,
  "backup-skill-bar": skillBarRecordSchema,
})

const scribedSkillSchema = z.object({
  skillId: z.enum(scribedSkills.ids),
  grimoireId: z.enum(grimoires.ids),
  focusScriptId: z.enum(focusScripts.ids),
  signatureScriptId: z.enum(signatureScripts.ids),
  affixScriptId: z.enum(affixScripts.ids),
})

const scribingSchema = z.array(scribedSkillSchema)

const cpDisciplineSchema = z.object({
  passive: z.array(z.enum(championPoints.ids)),
  slotted: z.array(z.enum(championPoints.ids)).length(4),
})

const championPointsSchema = z.object({
  warfare: cpDisciplineSchema,
  fitness: cpDisciplineSchema,
  craft: cpDisciplineSchema,
})

const attributesSchema = z
  .object({
    magicka: z.number().min(0).max(64),
    health: z.number().min(0).max(64),
    stamina: z.number().min(0).max(64),
  })
  .refine((data) => data.magicka + data.health + data.stamina <= 64, {
    message: "Total attributes cannot exceed 64",
  })

const curseStateSchema = z.enum(curses.ids)

const characterSchema = z.object({
  name: z.string(),
  roles: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) return val
      const mapped = val.map((id) => (id === "magicka-dps" || id === "stamina-dps" ? "dps" : id))
      return [...new Set(mapped)]
    },
    z.array(z.enum(roles.ids))
  ),
  class: z.enum(classes.ids),
  race: z.enum(races.ids),
  alliance: z.enum(alliances.ids),
  skillLineIds: z.array(z.enum(skillLines.ids)),
  attributes: attributesSchema,
  curseState: curseStateSchema,
  vampireStage: z.enum(vampireStages.ids),
  mundusStone: z.enum(mundus.ids),
})

const consumablesSchema = z.object({
  foodOrDrink: z.enum(foodOrDrink.ids),
  potion: z.enum(potions.ids),
  potion2: z.enum(potions.ids).default("no-potion"),
})

const targetSchema = z.object({
  armor: z.enum(targetArmor.ids),
  health: z.number().min(0).max(100),
  targetCount: z.number().min(1).max(6).default(1),
})

const accountSchema = z.object({
  esoPlus: z.enum(esoPlus.ids),
})

export const characterStateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Build name is required"),
  description: z.string(),
  character: characterSchema,
  equipment: equipmentSchema,
  skills: skillBarsSchema,
  passives: z.array(z.enum(skills.ids)),
  scribing: scribingSchema,
  championPoints: championPointsSchema,
  consumables: consumablesSchema,
  target: targetSchema,
  account: accountSchema,
})
