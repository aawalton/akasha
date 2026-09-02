import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crystallizedShield = {
  id: "01a05fd0-8df1-7e72-8e66-d0001fd47b09",
  pageTypeSlug: "temper-skill",
  slug: "crystallized-shield",
  title: "Crystallized Shield",
  key: "crystallized-shield",
  baseName: "Crystallized Shield",
  description:
    '"Spin a shield of ice around you, absorbing up to |cffffff23424|r damage from |cffffff3|r projectiles. \\n\\nEach time you absorb a projectile you gain |cffffff2|r Ultimate."',
  icon: "/esoui/art/icons/ability_warden_002.dds",
  esoSkillId: 86135,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
