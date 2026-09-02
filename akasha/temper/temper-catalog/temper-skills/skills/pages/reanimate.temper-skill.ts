import type { TemperSkill } from "../temper-skill.page-type.ts"

export const reanimate = {
  id: "01a05fd1-2e2e-789a-a573-ed569e209f94",
  pageTypeSlug: "temper-skill",
  slug: "reanimate",
  title: "Reanimate",
  key: "reanimate",
  baseName: "Reanimate",
  description:
    '"Bring your allies back from the brink of death, resurrecting up to |cffffff3|r allies at the target location."',
  icon: "/esoui/art/icons/ability_necromancer_018.dds",
  esoSkillId: 115410,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "ultimate",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
