import type { TemperSkill } from "../temper-skill.page-type.ts"

export const mirage35414 = {
  id: "01a05fd1-2dff-74a1-bf28-d145a5ca7b2e",
  pageTypeSlug: "temper-skill",
  slug: "mirage-35414",
  title: "Mirage",
  key: "mirage-35414",
  baseName: "Blur",
  description:
    '"Surround yourself in a phantasmic aura to gain Major Evasion and Minor Resolve, reducing damage from area attacks by |cffffff20|r% and increasing your Physical and Spell Resistance by |cffffff2974|r for |cffffff20|r seconds.\\n\\nWhile active, taking direct damage reduces the cost of your next Roll Dodge by |cffffff10|r%, up to a maximum of |cffffff100|r%. This effect can stack up to once every half second."',
  icon: "/esoui/art/icons/ability_nightblade_009_a.dds",
  esoSkillId: 35414,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
