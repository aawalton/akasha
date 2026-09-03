import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const immovable = {
  id: "019e6238-c2c9-78ee-b11a-d76fc09f51a1",
  pageTypeSlug: "temper-skill",
  slug: "immovable",
  title: "Immovable",
  key: "immovable",
  baseName: "Unstoppable",
  description:
    '"Intensify your physical presence to gain Major Resolve, increasing your Physical and Spell Resistance by 5948 for 23 seconds. \\n\\nAlso grants you immunity to knockback and disabling effects for 6 seconds, but reduces your Movement Speed by 65% for the duration.\\n\\nEach piece of Heavy Armor worn increases the amount of damage you block and the potency of the snare by 5%."',
  icon: "/esoui/art/icons/ability_armor_001_b.dds",
  esoSkillId: 41103,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 2,
  rank: 12,
  skillLineId: "armor-heavy-armor",
  skillType: "active",
  subcategoryId: "armor-heavy-armor",
} as const satisfies TemperSkill
