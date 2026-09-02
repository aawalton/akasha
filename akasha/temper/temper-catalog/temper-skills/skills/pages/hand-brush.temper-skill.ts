import type { TemperSkill } from "../temper-skill.page-type.ts"

export const handBrush = {
  id: "01a05fd0-dca5-78d0-82ee-a1762d2879e1",
  pageTypeSlug: "temper-skill",
  slug: "hand-brush",
  title: "Hand Brush",
  key: "hand-brush",
  baseName: "Hand Brush",
  description:
    '"Removes 1 layer of soil or rock from a 1x1 area.\\n\\nGenerates: 1 Intuition\\nMaximum Intuition: 4."',
  icon: "/esoui/art/icons/u26_ability_digging_03.dds",
  esoSkillId: 139909,
  isMorph: false,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
