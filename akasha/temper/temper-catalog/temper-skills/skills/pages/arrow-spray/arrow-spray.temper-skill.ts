import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const arrowSpray = {
  id: "019e6f53-9ec4-7ff1-8f01-3d00b1cbeb56",
  pageTypeSlug: "temper-skill",
  slug: "arrow-spray",
  title: "Arrow Spray",
  key: "arrow-spray",
  baseName: "Arrow Spray",
  description:
    '"Fire a burst of arrows in one shot, dealing |cffffff6400|r Physical Damage to enemies in front of you."',
  icon: "/esoui/art/icons/ability_bow_005.dds",
  esoSkillId: 31271,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
