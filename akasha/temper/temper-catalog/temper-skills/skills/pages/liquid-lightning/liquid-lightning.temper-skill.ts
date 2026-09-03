import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const liquidLightning = {
  id: "019e6245-a6bd-7e1d-8e9e-66a3272191a5",
  pageTypeSlug: "temper-skill",
  slug: "liquid-lightning",
  title: "Liquid Lightning",
  key: "liquid-lightning",
  baseName: "Lightning Splash",
  description:
    '"Create a nexus of storm energy at the target location, dealing 309 Shock Damage to enemies in the area every 1 second for 15 seconds.\\n \\nYou or an ally standing within the nexus can activate the Conduit synergy, dealing 2698 Shock Damage to enemies around them."',
  icon: "/esoui/art/icons/ability_sorcerer_liquid_lightning.dds",
  esoSkillId: 30286,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
