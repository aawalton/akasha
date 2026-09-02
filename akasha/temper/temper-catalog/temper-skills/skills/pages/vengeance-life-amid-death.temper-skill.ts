import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceLifeAmidDeath = {
  id: "01a05fd1-d2ae-7e1c-baea-bb2236d131a4",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-life-amid-death",
  title: "Vengeance Life amid Death",
  key: "vengeance-life-amid-death",
  baseName: "Vengeance Life amid Death",
  description:
    '"Release residual fragments of fallen souls at the target location, healing you or up to 3 allies in the area for |cffffff10710|r Health."',
  icon: "/esoui/art/icons/ability_necromancer_016.dds",
  esoSkillId: 238258,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-living-death",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-living-death",
} as const satisfies TemperSkill
