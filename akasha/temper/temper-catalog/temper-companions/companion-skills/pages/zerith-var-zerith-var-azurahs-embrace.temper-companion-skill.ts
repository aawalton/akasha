import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarAzurahsEmbrace = {
  id: "019e6484-38ad-783d-9933-9a92a3957728",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-azurahs-embrace",
  key: "zerith-var-azurahs-embrace",
  title: "Azurah's Embrace",
  icon: "/esoui/art/icons/ability_companion_necromancer_lifeamiddeath.dds",
  description:
    "Your Companion absolves the misdeeds of fallen souls at the target location, healing themselves and their allies for $1 Health and removing up to 3 negative effects.",
  companionId: "zerith-var",
  abilityId: 213162,
  skillLineId: "companion-zerith-var-remedy-of-atonement",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
