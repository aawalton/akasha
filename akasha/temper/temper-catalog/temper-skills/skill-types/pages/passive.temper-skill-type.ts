import type { TemperSkillType } from "../temper-skill-type.page-type.ts"

export const passive = {
  id: "01a05fce-298e-70c0-9381-0fffbd46dfa3",
  pageTypeSlug: "temper-skill-type",
  slug: "passive",
  title: "Passive",
  key: "passive",
  description: "Passive ability that provides permanent bonuses",
} as const satisfies TemperSkillType
