import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sapEssence36891 = {
  id: "019e6f53-a6ae-711a-877a-e113e883dd0d",
  pageTypeSlug: "temper-skill",
  slug: "sap-essence-36891",
  title: "Sap Essence",
  key: "sap-essence-36891",
  baseName: "Drain Power",
  description:
    '"Siphon the vigor from your enemies\' blood, dealing |cffffff6401|r Magic Damage to all nearby enemies and healing you and your allies for |cffffff1886|r plus |cffffff20|r% more for each enemy hit.\\n\\nIf an enemy is hit, you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_013_a.dds",
  esoSkillId: 36891,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
