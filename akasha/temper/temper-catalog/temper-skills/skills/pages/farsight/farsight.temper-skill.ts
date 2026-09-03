import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const farsight = {
  id: "019e6251-4cb4-783d-b1d3-738dbc5f1dfc",
  pageTypeSlug: "temper-skill",
  slug: "farsight",
  title: "Farsight",
  key: "farsight",
  baseName: "Farsight",
  description:
    '"Claim a line of facets, stretching out from your area of control.\\n\\nNew Effect: Range increased from 4 facets to 6.\\n\\nConsumes 1 Magicka Charge."',
  icon: "/esoui/art/icons/ability_scrying_03.dds",
  esoSkillId: 139321,
  isMorph: false,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
