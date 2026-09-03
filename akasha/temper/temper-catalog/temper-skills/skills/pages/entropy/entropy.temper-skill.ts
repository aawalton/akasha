import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const entropy = {
  id: "019e6f53-a194-765d-94b1-fa934697f56c",
  pageTypeSlug: "temper-skill",
  slug: "entropy",
  title: "Entropy",
  key: "entropy",
  baseName: "Entropy",
  description:
    '"Bind an enemy with chaotic magic, dealing |cffffff15224|r Magic Damage over |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_004.dds",
  esoSkillId: 28567,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
