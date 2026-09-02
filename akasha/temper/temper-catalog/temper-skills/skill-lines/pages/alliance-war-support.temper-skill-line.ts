import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const allianceWarSupport = {
  id: "01a05fce-2965-7470-a12b-904ac48fb936",
  pageTypeSlug: "temper-skill-line",
  slug: "alliance-war-support",
  title: "Support",
  key: "alliance-war-support",
  displayOrder: 45,
  esoSkillLineId: 67,
  maxRank: 10,
  subcategoryId: "alliance-war",
} as const satisfies TemperSkillLine
