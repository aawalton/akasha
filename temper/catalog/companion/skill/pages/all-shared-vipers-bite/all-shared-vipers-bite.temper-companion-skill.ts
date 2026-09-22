import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedVipersBite = {
  id: "019e668d-c550-7a2f-b045-155ddce14385",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-vipers-bite",
  key: "shared-vipers-bite",
  title: "Viper's Bite",
  icon: "/esoui/art/icons/ability_companion_bow_002.dds",
  description:
    "Your Companion shoots an arrow covered in Baandari poison at an enemy, dealing $1 Poison Damage and an additional $2 Poison Damage over $$2 seconds.",
  abilityId: 152863,
  skillLineId: "temper-companion-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
