import type { TemperSkill } from "../temper-skill.page-type.ts"

export const liquidLightning23200 = {
  id: "01a05fd1-2de9-762c-8212-ea2a62ab3fb9",
  pageTypeSlug: "temper-skill",
  slug: "liquid-lightning-23200",
  title: "Liquid Lightning",
  key: "liquid-lightning-23200",
  baseName: "Lightning Splash",
  description:
    '"Create a nexus of storm energy at the target location, dealing |cffffff1076|r Shock Damage to enemies in the area every |cffffff1|r second for |cffffff15|r seconds.\\n \\nYou or an ally standing within the nexus can activate the Conduit synergy, dealing |cffffff9914|r Shock Damage to enemies around them."',
  icon: "/esoui/art/icons/ability_sorcerer_liquid_lightning.dds",
  esoSkillId: 23200,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
