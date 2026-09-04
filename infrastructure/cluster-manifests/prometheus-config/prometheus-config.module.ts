import type { Module } from "@akasha/code-system/module"

export const prometheusConfig = {
  id: "01a06810-1263-7bb8-bf09-9f172432969e",
  pageTypeSlug: "module",
  slug: "prometheus-config",
  definition: "the document naming what the metrics server scrapes and when it alerts",
  code: "ts",
} as const satisfies Module
