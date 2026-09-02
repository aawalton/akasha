import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unstoppable = {
  id: "01a05fd1-d280-7869-acbd-d59a171531a6",
  pageTypeSlug: "temper-skill",
  slug: "unstoppable",
  title: "Unstoppable",
  key: "unstoppable",
  baseName: "Unstoppable",
  description:
    '"Intensify your physical presence to gain Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\\n\\nAlso grants you immunity to knockback and disabling effects for |cffffff6|r seconds, but reduces your Movement Speed by |cffffff65|r% for the duration."',
  icon: "/esoui/art/icons/ability_armor_001.dds",
  esoSkillId: 29552,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "armor-heavy-armor",
  skillType: "active",
  subcategoryId: "armor-heavy-armor",
} as const satisfies TemperSkill
