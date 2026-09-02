import type { TemperSkill } from "../temper-skill.page-type.ts"

export const conjuredWard = {
  id: "01a05fd0-43a0-776e-8cd9-9cf428d39e65",
  pageTypeSlug: "temper-skill",
  slug: "conjured-ward",
  title: "Conjured Ward",
  key: "conjured-ward",
  baseName: "Conjured Ward",
  description:
    '"Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs |cffffff7728|r damage for |cffffff6|r seconds.\\n\\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at |cffffff55|r% of your Max Health."',
  icon: "/esoui/art/icons/ability_sorcerer_hurricane.dds",
  esoSkillId: 28418,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
