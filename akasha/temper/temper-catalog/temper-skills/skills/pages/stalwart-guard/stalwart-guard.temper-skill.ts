import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const stalwartGuard = {
  id: "019e6251-4cf1-7d99-b2e9-cc86dfd2dd55",
  pageTypeSlug: "temper-skill",
  slug: "stalwart-guard",
  title: "Stalwart Guard",
  key: "stalwart-guard",
  baseName: "Guard",
  description:
    '"Create a lifebond between you and an allied player. While bonded, 30% of the damage they take is instead redistributed to you.\\n\\nYou and your bonded ally also gain Minor Force, increasing your Critical Damage by 10%.\\n\\nThe bond will remain until you recast the spell or move more than 15 meters away from your ally."',
  icon: "/esoui/art/icons/ability_ava_stalwart_guard.dds",
  esoSkillId: 63351,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
