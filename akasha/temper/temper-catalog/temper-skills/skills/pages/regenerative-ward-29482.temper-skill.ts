import type { TemperSkill } from "../temper-skill.page-type.ts"

export const regenerativeWard29482 = {
  id: "01a05fd1-7c83-7837-b559-36fc1161d7ab",
  pageTypeSlug: "temper-skill",
  slug: "regenerative-ward-29482",
  title: "Regenerative Ward",
  key: "regenerative-ward-29482",
  baseName: "Conjured Ward",
  description:
    '"Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs |cffffff7729|r damage for |cffffff10|r seconds, heals you for |cffffff1038|r Health, and grants Minor Intellect and Minor Endurance to you and nearby allies for |cffffff10|r seconds.\\n\\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at |cffffff55|r% of your Max Health."',
  icon: "/esoui/art/icons/ability_sorcerer_tempest.dds",
  esoSkillId: 29482,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
