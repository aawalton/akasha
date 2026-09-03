import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const guard = {
  id: "019e6f53-a2c0-7c00-ba68-ade8f61b0433",
  pageTypeSlug: "temper-skill",
  slug: "guard",
  title: "Guard",
  key: "guard",
  baseName: "Guard",
  description:
    '"Create a lifebond between you and an allied player. While bonded, |cffffff30|r% of the damage they take is instead redistributed to you.\\n\\nThe bond will remain until you recast the spell or move more than |cffffff15|r meters away from your ally."',
  icon: "/esoui/art/icons/ability_ava_guard.dds",
  esoSkillId: 61511,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
