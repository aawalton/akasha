import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDeathStroke = {
  id: "019e6f53-a8e9-7687-a6cb-bd5e3a1df8fd",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-death-stroke",
  title: "Vengeance Death Stroke",
  key: "vengeance-death-stroke",
  baseName: "Vengeance Death Stroke",
  description:
    '"Ravage an enemy with a swift strike, dealing |cffffff11130|r Magic Damage. Deals up to |cffffff200|r% more damage to enemies under |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_nightblade_007.dds",
  esoSkillId: 237619,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-assassination",
  skillType: "ultimate",
  subcategoryId: "vengeance-nightblade-assassination",
} as const satisfies TemperSkill
