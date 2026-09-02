import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const natureSGrasp = {
  id: "01a05fd1-2e04-7e69-bf3e-d10778c4b581",
  pageTypeSlug: "temper-skill",
  slug: "nature-s-grasp",
  title: "Nature's Grasp",
  key: "nature-s-grasp",
  baseName: "Nature's Grasp",
  description:
    '"Launch a vine to swing yourself to an ally, healing them for |cffffff10950|r Health over |cffffff10|r seconds. You gain |cffffff3|r Ultimate when this effect completes if you are in combat."',
  icon: "/esoui/art/icons/ability_warden_011.dds",
  esoSkillId: 85564,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
