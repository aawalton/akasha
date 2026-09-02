import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceReverseSlash = {
  id: "01a05fd2-1e82-7bf4-9c6a-463b6de632d1",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-reverse-slash",
  title: "Vengeance Reverse Slash",
  key: "vengeance-reverse-slash",
  baseName: "Vengeance Reverse Slash",
  description:
    '"Spin around and strike an enemy down, dealing |cffffff5565|r Physical Damage. Deals up to |cffffff300|r% more damage to enemies with less than |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_2handed_004.dds",
  esoSkillId: 240482,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-two-handed",
  skillType: "active",
  subcategoryId: "vengeance-weapon-two-handed",
} as const satisfies TemperSkill
