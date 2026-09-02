import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hexproof = {
  id: "01a05fd0-dcb3-7395-85c1-99c7d4634404",
  pageTypeSlug: "temper-skill",
  slug: "hexproof",
  title: "Hexproof",
  key: "hexproof",
  baseName: "Expunge",
  description:
    '"Embrace the power of death, removing up to 4 negative effects from yourself.\\n\\nWhile slotted, the cost of all your abilities are reduced by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_014_a.dds",
  esoSkillId: 40117919,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
  effects: "jsonl",
} as const satisfies TemperSkill
