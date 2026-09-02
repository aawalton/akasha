import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reverseSlash = {
  id: "01a05fd1-7c98-72a0-ac82-057fbda665d5",
  pageTypeSlug: "temper-skill",
  slug: "reverse-slash",
  title: "Reverse Slash",
  key: "reverse-slash",
  baseName: "Reverse Slash",
  description:
    '"Shift your grip and strike an enemy down, dealing |cffffff4036|r Physical Damage. Deals up to |cffffff300|r% more damage to enemies with less than |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_2handed_004.dds",
  esoSkillId: 28302,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
