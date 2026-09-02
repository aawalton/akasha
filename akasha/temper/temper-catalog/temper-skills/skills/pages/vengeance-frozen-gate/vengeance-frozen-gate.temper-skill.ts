import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFrozenGate = {
  id: "01a05fd1-d2a7-7e22-82fa-0efc80f6ea3a",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-frozen-gate",
  title: "Vengeance Frozen Gate",
  key: "vengeance-frozen-gate",
  baseName: "Vengeance Frozen Gate",
  description:
    '"Summon an ancient portal, that after |cffffff2|r seconds teleports an enemy in the area to you and immobilizes them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_warden_005.dds",
  esoSkillId: 238091,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-winters-embrace",
  skillType: "active",
  subcategoryId: "vengeance-warden-winters-embrace",
} as const satisfies TemperSkill
