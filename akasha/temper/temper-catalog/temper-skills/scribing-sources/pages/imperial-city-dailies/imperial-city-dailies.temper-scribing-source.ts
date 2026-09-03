import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const imperialCityDailies = {
  id: "019e12b0-85eb-78e8-bb06-c717d3082bfd",
  pageTypeSlug: "temper-scribing-source",
  slug: "imperial-city-dailies",
  title: "Imperial City Dailies",
  displayOrder: 1,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: ["imperial-city"],
} as const satisfies TemperScribingSource
