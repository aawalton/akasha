import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceConjuredWard = {
  id: "019e6f53-a8d8-76d9-b873-36d83e3832fb",
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
