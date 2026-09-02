import type { TemperSkill } from "../temper-skill.page-type.ts"

export const veiledStrike = {
  id: "01a05fd1-d284-75f0-a56f-951182df3c01",
  pageTypeSlug: "temper-skill",
  slug: "veiled-strike",
  title: "Veiled Strike",
  key: "veiled-strike",
  baseName: "Veiled Strike",
  description:
    '"Slash an enemy, dealing |cffffff8076|r Magic Damage. \\n\\nIf you strike an enemy from their flank you set them Off Balance."',
  icon: "/esoui/art/icons/ability_nightblade_002.dds",
  esoSkillId: 25255,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
