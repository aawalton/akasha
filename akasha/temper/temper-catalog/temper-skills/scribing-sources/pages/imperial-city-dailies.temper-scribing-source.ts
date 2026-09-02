import type { TemperScribingSource } from "../temper-scribing-source.page-type.ts"

export const imperialCityDailies = {
  id: "01a05fce-295b-72d7-bec4-917c1fb0ccc0",
  pageTypeSlug: "temper-scribing-source",
  slug: "imperial-city-dailies",
  title: "Imperial City Dailies",
  displayOrder: 1,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: ["imperial-city"],
} as const satisfies TemperScribingSource
