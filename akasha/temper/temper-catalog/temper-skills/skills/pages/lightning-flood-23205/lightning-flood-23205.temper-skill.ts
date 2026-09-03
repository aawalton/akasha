import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightningFlood23205 = {
  id: "019e6f53-a3fa-7845-ab10-4b93883d6f63",
  pageTypeSlug: "temper-skill",
  slug: "lightning-flood-23205",
  title: "Lightning Flood",
  key: "lightning-flood-23205",
  baseName: "Lightning Splash",
  description:
    '"Create a nexus of storm energy at the target location, dealing |cffffff1445|r Shock Damage to enemies in the area every |cffffff1|r second for |cffffff10|r seconds.\\n \\nYou or an ally standing within the nexus can activate the Conduit synergy, dealing |cffffff9914|r Shock Damage to enemies around them."',
  icon: "/esoui/art/icons/ability_sorcerer_lightning_flood.dds",
  esoSkillId: 23205,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
