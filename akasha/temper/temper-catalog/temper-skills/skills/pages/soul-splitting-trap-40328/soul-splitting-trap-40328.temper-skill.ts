import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulSplittingTrap40328 = {
  id: "019e6f53-a776-71b6-a9d9-edc6cf08dc05",
  pageTypeSlug: "temper-skill",
  slug: "soul-splitting-trap-40328",
  title: "Soul Splitting Trap",
  key: "soul-splitting-trap-40328",
  baseName: "Soul Trap",
  description:
    '"Lay claim to enemy souls, dealing |cffffff7614|r Magic Damage to your target and any other nearby enemies over |cffffff10|r seconds.\\n\\nFills an empty Soul Gem if an affected enemy dies."',
  icon: "/esoui/art/icons/ability_otherclass_001_a.dds",
  esoSkillId: 40328,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill
