import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceNegateMagic = {
  id: "01a05fd2-1e79-79b4-8384-dcc53b636136",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-negate-magic",
  title: "Vengeance Negate Magic",
  key: "vengeance-negate-magic",
  baseName: "Vengeance Negate Magic",
  description:
    '"Create a globe of magic suppression at your target location that stuns up to 3 enemies in the area for |cffffff3|r seconds and silences them if they are a player for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_monsoon.dds",
  esoSkillId: 237856,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-dark-magic",
  skillType: "ultimate",
  subcategoryId: "vengeance-sorcerer-dark-magic",
} as const satisfies TemperSkill
