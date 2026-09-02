import type { TemperScribingSource } from "../temper-scribing-source.page-type.ts"

export const fightersGuildDaily = {
  id: "01a05fce-295a-77c6-97b3-30d1481fc24b",
  pageTypeSlug: "temper-scribing-source",
  slug: "fighters-guild-daily",
  title: "Fighters Guild Daily",
  displayOrder: 0,
  scriptType: "signature",
  tierAchievements: "jsonl",
  zoneSlugs: ["stormhaven", "deshaan", "grahtwood"],
} as const satisfies TemperScribingSource
