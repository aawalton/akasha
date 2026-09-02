import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shimmeringShield = {
  id: "01a05fd1-7cc0-73f6-97b8-e48327a2205a",
  pageTypeSlug: "temper-skill",
  slug: "shimmering-shield",
  title: "Shimmering Shield",
  key: "shimmering-shield",
  baseName: "Crystallized Shield",
  description:
    '"Spin a shield of ice around you, absorbing up to 16527 damage from 3 projectiles. \\n\\nEach time you absorb a projectile you gain 2 Ultimate and gain Major Heroism for 6 seconds, granting you 3 Ultimate every 1.5 seconds."',
  icon: "/esoui/art/icons/ability_warden_002_b.dds",
  esoSkillId: 86146,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
