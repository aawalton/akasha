import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceArrowSpray = {
  id: "01a05fd1-d287-73f6-8932-0d35ef075d77",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-arrow-spray",
  title: "Vengeance Arrow Spray",
  key: "vengeance-arrow-spray",
  baseName: "Vengeance Arrow Spray",
  description:
    '"Fire a burst of arrows in one shot, dealing |cffffff8820|r Physical Damage to up to 3 enemies in front of you."',
  icon: "/esoui/art/icons/ability_bow_005.dds",
  esoSkillId: 241274,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-bow",
  skillType: "active",
  subcategoryId: "vengeance-weapon-bow",
} as const satisfies TemperSkill
