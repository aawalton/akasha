import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const defensiveRune24574 = {
  id: "019e6f53-a0b1-71e0-8ca1-afa977f7be57",
  pageTypeSlug: "temper-skill",
  slug: "defensive-rune-24574",
  title: "Defensive Rune",
  key: "defensive-rune-24574",
  baseName: "Rune Prison",
  description:
    '"Place a rune of protection on yourself for |cffffff2|r minutes. While active, the next enemy to attack you is imprisoned in a constricting sphere of dark magic, stunning them after a short delay for |cffffff3|r seconds.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_sorcerer_weakening_fog.dds",
  esoSkillId: 24574,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
