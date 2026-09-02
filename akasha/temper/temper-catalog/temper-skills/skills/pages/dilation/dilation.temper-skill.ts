import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dilation = {
  id: "01a05fd0-8e0b-742a-a2ca-4f5579ae2211",
  pageTypeSlug: "temper-skill",
  slug: "dilation",
  title: "Dilation",
  key: "dilation",
  baseName: "Dilation",
  description:
    '"Claim all facets of the selected type that touch your area of control, as well as matching facets directly adjacent.\\n\\nNew Effect: Dilation now claims ALL contiguous facets of the same type.\\n\\nConsumes 1 Magicka Charge."',
  icon: "/esoui/art/icons/ability_scrying_04.dds",
  esoSkillId: 139308,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
