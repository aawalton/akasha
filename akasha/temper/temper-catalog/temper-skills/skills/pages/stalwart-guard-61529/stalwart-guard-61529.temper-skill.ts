import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const stalwartGuard61529 = {
  id: "019e6f53-a7ae-7dcd-9da8-563b2d84deaa",
  pageTypeSlug: "temper-skill",
  slug: "stalwart-guard-61529",
  title: "Stalwart Guard",
  key: "stalwart-guard-61529",
  baseName: "Guard",
  description:
    '"Create a lifebond between you and an allied player. While bonded, |cffffff30|r% of the damage they take is instead redistributed to you.\\n\\nYou and your bonded ally also gain Minor Force, increasing your Critical Damage by |cffffff10|r%.\\n\\nThe bond will remain until you recast the spell or move more than |cffffff15|r meters away from your ally."',
  icon: "/esoui/art/icons/ability_ava_stalwart_guard.dds",
  esoSkillId: 61529,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
