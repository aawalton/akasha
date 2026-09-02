import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceReanimate = {
  id: "01a05fd2-1e80-7e18-8050-cd15b026b4ea",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-reanimate",
  title: "Vengeance Reanimate",
  key: "vengeance-reanimate",
  baseName: "Vengeance Reanimate",
  description:
    '"Bring your allies back from the brink of death, resurrecting up to |cffffff3|r allies at the target location."',
  icon: "/esoui/art/icons/ability_necromancer_018.dds",
  esoSkillId: 238316,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-living-death",
  skillType: "ultimate",
  subcategoryId: "vengeance-necromancer-living-death",
} as const satisfies TemperSkill
