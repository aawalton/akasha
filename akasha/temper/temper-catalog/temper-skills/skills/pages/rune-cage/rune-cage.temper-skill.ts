import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeCage = {
  id: "019e6245-a717-7510-985f-d25e2cee8631",
  pageTypeSlug: "temper-skill",
  slug: "rune-cage",
  title: "Rune Cage",
  key: "rune-cage",
  baseName: "Rune Prison",
  description:
    '"Imprison an enemy in a constricting sphere of dark magic. After a short duration they are stunned for 3 seconds. Deals 1799 Magic Damage if the stun lasts the full duration.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_sorcerer_dark_haze.dds",
  esoSkillId: 30177,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
