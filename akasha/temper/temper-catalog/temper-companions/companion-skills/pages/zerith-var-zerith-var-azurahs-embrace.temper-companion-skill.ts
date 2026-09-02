import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarAzurahsEmbrace = {
  id: "01a05fd0-1d87-7c28-a471-c0c2c26a401a",
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
} as const satisfies TemperCompanionSkill
