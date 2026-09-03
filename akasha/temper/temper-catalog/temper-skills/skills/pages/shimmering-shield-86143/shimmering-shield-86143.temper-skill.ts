import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shimmeringShield86143 = {
  id: "019e6f53-a705-725a-8ac5-13932c5f8728",
  pageTypeSlug: "temper-skill",
  slug: "shimmering-shield-86143",
  title: "Shimmering Shield",
  key: "shimmering-shield-86143",
  baseName: "Crystallized Shield",
  description:
    '"Spin a shield of ice around you, absorbing up to |cffffff23423|r damage from |cffffff3|r projectiles. \\n\\nEach time you absorb a projectile you gain |cffffff2|r Ultimate and gain Major Heroism for |cffffff6|r seconds, granting you |cffffff3|r Ultimate every |cffffff1.5|r seconds."',
  icon: "/esoui/art/icons/ability_warden_002_b.dds",
  esoSkillId: 86143,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
