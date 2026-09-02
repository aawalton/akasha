import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBoundArmor = {
  id: "01a05fd1-d28f-7092-9e19-c8fec68dfb0a",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bound-armor",
  title: "Vengeance Bound Armor",
  key: "vengeance-bound-armor",
  baseName: "Vengeance Bound Armor",
  description:
    '"Protect yourself with the power of Oblivion, creating a suit of Daedric mail that grants Major Protection for |cffffff10|r seconds, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_bound_armor.dds",
  esoSkillId: 237930,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-daedric-summoning",
} as const satisfies TemperSkill
