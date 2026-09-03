import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const cyrodiilTownDailies = {
  id: "019e12b0-85e4-77f3-aa3b-76b242b50c2f",
  pageTypeSlug: "temper-scribing-source",
  slug: "cyrodiil-town-dailies",
  title: "Cyrodiil Town Dailies",
  displayOrder: 1,
  scriptType: "signature",
  tierAchievements: "jsonl",
  zoneSlugs: ["cyrodiil"],
} as const satisfies TemperScribingSource
