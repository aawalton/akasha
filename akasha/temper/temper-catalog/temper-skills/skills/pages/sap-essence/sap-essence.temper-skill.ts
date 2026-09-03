import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sapEssence = {
  id: "019e6245-a722-7c26-84b8-8443dc1cc304",
  pageTypeSlug: "temper-skill",
  slug: "sap-essence",
  title: "Sap Essence",
  key: "sap-essence",
  baseName: "Drain Power",
  description:
    '"Siphon the vigor from your enemies\' blood, dealing 1742 Magic Damage to all nearby enemies and healing you and your allies for 599 plus 20% more for each enemy hit.\\n\\nIf an enemy is hit, you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 30 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_013_a.dds",
  esoSkillId: 37950,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
