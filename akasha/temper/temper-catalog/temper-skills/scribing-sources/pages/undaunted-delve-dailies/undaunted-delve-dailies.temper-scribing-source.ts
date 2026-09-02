import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const undauntedDelveDailies = {
  id: "01a05fce-295b-70ac-8b87-d47b1aaf6f3d",
  pageTypeSlug: "temper-scribing-source",
  slug: "undaunted-delve-dailies",
  title: "Undaunted Delve Dailies",
  displayOrder: 0,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: ["stormhaven", "deshaan", "grahtwood"],
} as const satisfies TemperScribingSource
