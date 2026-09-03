import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unstoppableBrute = {
  id: "019e6238-c32c-7033-874d-6e5743112f56",
  pageTypeSlug: "temper-skill",
  slug: "unstoppable-brute",
  title: "Unstoppable Brute",
  key: "unstoppable-brute",
  baseName: "Unstoppable",
  description:
    '"Intensify your physical presence to gain Major Resolve, increasing your Physical and Spell Resistance by 5948 for 20 seconds.\\n\\nWhile this effect persists, each piece of Heavy Armor worn decreases the cost of Break Free by 5%.\\n\\nAlso grants you immunity to knockback and disabling effects for 6 seconds, but reduces your Movement Speed by 65% for the duration."',
  icon: "/esoui/art/icons/ability_armor_001_a.dds",
  esoSkillId: 41091,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 8,
  skillLineId: "armor-heavy-armor",
  skillType: "active",
  subcategoryId: "armor-heavy-armor",
} as const satisfies TemperSkill
