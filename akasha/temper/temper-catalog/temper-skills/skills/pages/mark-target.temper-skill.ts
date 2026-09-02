import type { TemperSkill } from "../temper-skill.page-type.ts"

export const markTarget = {
  id: "01a05fd1-2df6-7b8b-989a-2ef2636f06c6",
  pageTypeSlug: "temper-skill",
  slug: "mark-target",
  title: "Mark Target",
  key: "mark-target",
  baseName: "Mark Target",
  description:
    '"Expose an enemy\'s weaknesses by applying Major Breach to them, reducing Physical Resistance and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\\n\\nWhen a marked enemy dies, you heal to full Health.\\n\\nYou can only have one Mark Target active at a time."',
  icon: "/esoui/art/icons/ability_nightblade_014.dds",
  esoSkillId: 33357,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
