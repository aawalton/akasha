import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const airQualityFetch = {
  id: "01a06972-b5cc-7000-aac7-3a2d890e4743",
  pageTypeSlug: "module",
  slug: "air-quality-fetch",
  definition: "one live reading of the air, taken from the open-meteo source",
  code: "ts",
} as const satisfies Module
