import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const battleRush = {
  id: "01a05fd0-435d-78af-b19f-922e94380c40",
  pageTypeSlug: "temper-skill",
  slug: "battle-rush",
  title: "Battle Rush",
  key: "battle-rush",
  baseName: "Battle Rush",
  description: '"Increases your Stamina Recovery by 30% for 10 seconds after killing a target."',
  icon: "/esoui/art/icons/ability_weapon_021.dds",
  esoSkillId: 45448,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 41,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "passive",
  subcategoryId: "weapon-two-handed",
  status: "unsupported",
} as const satisfies TemperSkill
