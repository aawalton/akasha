import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unstoppableBrute39205 = {
  id: "019e6f53-a89e-73e7-90ac-2c96b84d5b4d",
  pageTypeSlug: "temper-skill",
  slug: "unstoppable-brute-39205",
  title: "Unstoppable Brute",
  key: "unstoppable-brute-39205",
  baseName: "Unstoppable",
  description:
    '"Intensify your physical presence to gain Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\\n\\nWhile this effect persists, each piece of Heavy Armor worn decreases the cost of Break Free by |cffffff5|r%.\\n\\nAlso grants you immunity to knockback and disabling effects for |cffffff6|r seconds, but reduces your Movement Speed by |cffffff65|r% for the duration."',
  icon: "/esoui/art/icons/ability_armor_001_a.dds",
  esoSkillId: 39205,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 22,
  skillLineId: "armor-heavy-armor",
  skillType: "active",
  subcategoryId: "armor-heavy-armor",
} as const satisfies TemperSkill
