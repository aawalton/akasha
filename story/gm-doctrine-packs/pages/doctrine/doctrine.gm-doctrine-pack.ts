import type { GmDoctrinePack } from "../../gm-doctrine-pack.page-type.ts"

export const doctrine = {
  id: "01a06590-c57a-7618-b2b3-74a985855b84",
  pageTypeSlug: "gm-doctrine-pack",
  slug: "doctrine",
  doctrineVersion: 33,
  policies: "json",
  gateDimensions: "json",
  sheetTemplate: "json",
  tallyCatalog: "json",
} as const satisfies GmDoctrinePack
