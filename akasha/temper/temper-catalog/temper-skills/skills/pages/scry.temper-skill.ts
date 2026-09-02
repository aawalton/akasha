import type { TemperSkill } from "../temper-skill.page-type.ts"

export const scry = {
  id: "01a05fd1-7cb5-7fe8-9309-42bf1839ad36",
  pageTypeSlug: "temper-skill",
  slug: "scry",
  title: "Scry",
  key: "scry",
  baseName: "Scry",
  description:
    '"Adds the selected contiguous group of facets to your area of control.\\n\\nConsumes 1 turn."',
  icon: "/esoui/art/icons/ability_scrying_01.dds",
  esoSkillId: 139942,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
