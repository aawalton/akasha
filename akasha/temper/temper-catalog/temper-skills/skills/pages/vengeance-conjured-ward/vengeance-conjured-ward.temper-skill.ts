import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceConjuredWard = {
  id: "01a05fd1-d292-7c8c-9076-38e05ac31996",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-conjured-ward",
  title: "Vengeance Conjured Ward",
  key: "vengeance-conjured-ward",
  baseName: "Vengeance Conjured Ward",
  description:
    '"Conjure globes of Daedric energy for protection, granting a damage shield for you that absorbs |cffffff18113|r damage for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_hurricane.dds",
  esoSkillId: 237929,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-daedric-summoning",
} as const satisfies TemperSkill
