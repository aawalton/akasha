import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lokiConfigs = {
  id: "01a06816-68b1-7a76-9875-45bb88f171a7",
  type: "page-type/module",
  slug: "loki-configs",
  definition: "the config Loki and Promtail each read at startup",
  code: "ts",
} as const satisfies Module
