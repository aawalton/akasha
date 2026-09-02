import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const coalescence = {
  id: "01a05fd0-4399-7f48-abe0-01dbce47c7ac",
  pageTypeSlug: "temper-skill",
  slug: "coalescence",
  title: "Coalescence",
  key: "coalescence",
  baseName: "Coalescence",
  description:
    "\"Unites a hexagonal cluster of facets in the Antiquarian's Eye, converting the symbols to match that of the central facet.\\n\\nNew Effect: The ability's range increases by one facet, creating a snowflake-like pattern.\\n\\nConsumes 1 Magicka Charge.\"",
  icon: "/esoui/art/icons/ability_scrying_02.dds",
  esoSkillId: 139306,
  isMorph: false,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
