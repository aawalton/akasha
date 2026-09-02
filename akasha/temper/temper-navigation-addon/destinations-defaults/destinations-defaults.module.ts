import type { Module } from "@akasha/code-system/module"

export const destinationsDefaults = {
  id: "01a06269-28be-7fc6-b973-a4499ed9f135",
  pageTypeSlug: "module",
  slug: "destinations-defaults",
  definition: "the settings a fresh destinations install starts from",
  code: "ts",
} as const satisfies Module
