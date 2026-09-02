import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const expunge = {
  id: "01a05fd0-8e2e-718e-a209-703b2aaa97a4",
  pageTypeSlug: "temper-skill",
  slug: "expunge",
  title: "Expunge",
  key: "expunge",
  baseName: "Expunge",
  description:
    '"Embrace the power of death, removing up to |cffffff2|r negative effects from yourself.\\n\\nWhile slotted, the cost of all your abilities are reduced by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_necromancer_014.dds",
  esoSkillId: 115307,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
