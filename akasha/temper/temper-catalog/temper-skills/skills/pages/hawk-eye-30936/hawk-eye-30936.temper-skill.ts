import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hawkEye30936 = {
  id: "019e6f53-a2df-7b79-83d6-35db03efef30",
  pageTypeSlug: "temper-skill",
  slug: "hawk-eye-30936",
  title: "Hawk Eye",
  key: "hawk-eye-30936",
  baseName: "Hawk Eye",
  description:
    '"Dealing damage with a Light or Heavy Attack increases the damage of your Bow abilities by |cffffff2|r% for |cffffff5|r seconds, stacking up to |cffffff5|r times."',
  icon: "/esoui/art/icons/passive_armor_002.dds",
  esoSkillId: 30936,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "weapon-bow",
  skillType: "passive",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
