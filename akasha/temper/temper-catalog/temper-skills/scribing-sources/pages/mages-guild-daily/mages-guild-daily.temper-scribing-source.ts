import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const magesGuildDaily = {
  id: "01a05fce-295b-75a1-8e8c-37ce9116354e",
  pageTypeSlug: "temper-scribing-source",
  slug: "mages-guild-daily",
  title: "Mages Guild Daily",
  displayOrder: 0,
  scriptType: "focus",
  tierAchievements: "jsonl",
  zoneSlugs: ["stormhaven", "deshaan", "grahtwood"],
} as const satisfies TemperScribingSource
