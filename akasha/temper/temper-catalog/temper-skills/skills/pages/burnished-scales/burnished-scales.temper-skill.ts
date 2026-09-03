import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const burnishedScales = {
  id: "019e6f53-9fa6-7400-855c-86ba606dfb23",
  pageTypeSlug: "temper-skill",
  slug: "burnished-scales",
  title: "Burnished Scales",
  key: "burnished-scales",
  baseName: "Burnished Scales",
  description:
    '"A Dragon\'s scales will turn aside arrow, fire, and blade.\\n\\nIncreases the amount of damage you block by |cffffff4|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 29455,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "dragonknight-draconic-power",
  skillType: "passive",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
