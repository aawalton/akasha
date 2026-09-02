import type { TemperSkill } from "../temper-skill.page-type.ts"

export const expungeAndModify = {
  id: "01a05fd0-8e2e-7d80-83c5-3acc550ccd07",
  pageTypeSlug: "temper-skill",
  slug: "expunge-and-modify",
  title: "Expunge and Modify",
  key: "expunge-and-modify",
  baseName: "Expunge",
  description:
    '"Embrace the power of death, removing up to 2 negative effects from yourself and restoring 515 Magicka and Stamina for each negative effect removed.\\n\\nWhile slotted, the cost of all your abilities are reduced by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_014_b.dds",
  esoSkillId: 40117940,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
