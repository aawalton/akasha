import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const futureFocus = {
  id: "01a05fd0-dc9a-7c71-a549-9dd45debfb0c",
  pageTypeSlug: "temper-skill",
  slug: "future-focus",
  title: "Future Focus",
  key: "future-focus",
  baseName: "Future Focus",
  description: '"Grants you two additional Magicka Charges for use in Scrying."',
  icon: "/esoui/art/icons/ability_scrying_07c.dds",
  esoSkillId: 139781,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
