import type { TemperScribingSource } from "../temper-scribing-source.page-type.ts"

export const cyrodiilTownDailies = {
  id: "01a05fce-2959-74b8-97c6-5f751ff9b973",
  pageTypeSlug: "temper-scribing-source",
  slug: "cyrodiil-town-dailies",
  title: "Cyrodiil Town Dailies",
  displayOrder: 1,
  scriptType: "signature",
  tierAchievements: "jsonl",
  zoneSlugs: ["cyrodiil"],
} as const satisfies TemperScribingSource
