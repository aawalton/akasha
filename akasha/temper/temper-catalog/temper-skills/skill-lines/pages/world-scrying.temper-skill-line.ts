import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const worldScrying = {
  id: "01a05fce-298b-77ca-9551-89bc04944527",
  pageTypeSlug: "temper-skill-line",
  slug: "world-scrying",
  title: "Scrying",
  key: "world-scrying",
  displayOrder: 33,
  esoSkillLineId: 155,
  maxRank: 10,
  subcategoryId: "world",
} as const satisfies TemperSkillLine
