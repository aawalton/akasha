import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const drainPower = {
  id: "019e6f53-a0e9-7b9c-8c11-dde553e4b1ec",
  pageTypeSlug: "temper-skill",
  slug: "drain-power",
  title: "Drain Power",
  key: "drain-power",
  baseName: "Drain Power",
  description:
    '"Siphon the vigor from your enemies\' blood, dealing |cffffff6400|r Magic Damage to all nearby enemies.\\n\\nIf an enemy is hit, you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_013.dds",
  esoSkillId: 33316,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
