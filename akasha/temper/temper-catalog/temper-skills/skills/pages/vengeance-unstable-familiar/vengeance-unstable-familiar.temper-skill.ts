import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceUnstableFamiliar = {
  id: "019e6f53-a9a4-7810-bb4b-b509096df346",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-unstable-familiar",
  title: "Vengeance Unstable Familiar",
  key: "vengeance-unstable-familiar",
  baseName: "Vengeance Unstable Familiar",
  description:
    '"Command the powers of Oblivion to send a Daedric familiar to fight. After a delay, the familiar attacks and deals |cffffff18020|r Shock Damage over |cffffff6|r seconds to up to 3 nearby enemies."',
  icon: "/esoui/art/icons/ability_sorcerer_unstable_fimiliar.dds",
  esoSkillId: 237865,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-daedric-summoning",
} as const satisfies TemperSkill
