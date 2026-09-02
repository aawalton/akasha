import type { TemperSkill } from "../temper-skill.page-type.ts"

export const deepSlash = {
  id: "01a05fd0-8e04-7437-9d5f-bf126fd65059",
  pageTypeSlug: "temper-skill",
  slug: "deep-slash",
  title: "Deep Slash",
  key: "deep-slash",
  baseName: "Low Slash",
  description:
    '"Surprise an enemy with a sweeping lunge, dealing 1799 Physical Damage to them and other nearby enemies, afflicting them with Minor Maim, reducing their damage done by 5% for 15 seconds.\\n\\nEnemies hit also have their Movement Speed reduced by 30% for 4 seconds."',
  icon: "/esoui/art/icons/ability_1handed_001_b.dds",
  esoSkillId: 41403,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
