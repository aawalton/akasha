import type { Module } from "@akasha/code-system/module"

export const lokiConfigs = {
  id: "01a06816-68b1-7a76-9875-45bb88f171a7",
  pageTypeSlug: "module",
  slug: "loki-configs",
  definition: "the configuration Loki and Promtail each read at startup",
  code: "ts",
} as const satisfies Module
