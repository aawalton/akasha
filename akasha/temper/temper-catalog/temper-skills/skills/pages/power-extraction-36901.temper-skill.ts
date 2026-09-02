import type { TemperSkill } from "../temper-skill.page-type.ts"

export const powerExtraction36901 = {
  id: "01a05fd1-2e17-7958-a30b-9226ee5a2839",
  pageTypeSlug: "temper-skill",
  slug: "power-extraction-36901",
  title: "Power Extraction",
  key: "power-extraction-36901",
  baseName: "Drain Power",
  description:
    '"Siphon the vigor from your enemies\' blood, dealing |cffffff6401|r Disease Damage to all nearby enemies.\\n\\nIf an enemy is hit you gain Major Brutality and Sorcery, and Minor Courage increasing your Weapon and Spell Damage by |cffffff20|r% and |cffffff215|r for |cffffff30|r seconds. Enemies hit have Minor Cowardice applied to them for |cffffff10|r seconds, reducing their Weapon and Spell Damage by |cffffff215|r."',
  icon: "/esoui/art/icons/ability_nightblade_013_b.dds",
  esoSkillId: 36901,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
