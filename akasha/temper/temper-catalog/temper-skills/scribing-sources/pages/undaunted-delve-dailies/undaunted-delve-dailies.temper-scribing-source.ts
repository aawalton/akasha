import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const undauntedDelveDailies = {
  id: "019e12b0-85ea-7088-9059-200f16b5ae05",
  pageTypeSlug: "temper-scribing-source",
  slug: "undaunted-delve-dailies",
  title: "Undaunted Delve Dailies",
  displayOrder: 0,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: ["stormhaven", "deshaan", "grahtwood"],
} as const satisfies TemperScribingSource
