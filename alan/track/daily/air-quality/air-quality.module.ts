import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const airQuality = {
  id: "01a06972-b54e-7000-ba1e-08274fe9d43c",
  type: "module",
  slug: "air-quality",
  definition: "the air over Alan's day, and whether it is fit to exert outdoors in",
  code: "ts",
} as const satisfies Module
