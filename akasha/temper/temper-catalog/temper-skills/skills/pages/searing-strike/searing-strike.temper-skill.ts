import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const searingStrike = {
  id: "019e6f53-a6d0-7ac2-8995-320fb9599374",
  pageTypeSlug: "temper-skill",
  slug: "searing-strike",
  title: "Searing Strike",
  key: "searing-strike",
  baseName: "Searing Strike",
  description:
    '"Slash your foe with a fiery claw, dealing |cffffff4036|r Flame Damage and an additional |cffffff11430|r Flame Damage over |cffffff10|r seconds.\\n\\nThe initial hit always applies the Burning status effect."',
  icon: "/esoui/art/icons/ability_dragonknight_003.dds",
  esoSkillId: 20657,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
