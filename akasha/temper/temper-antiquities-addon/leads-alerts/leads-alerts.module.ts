import type { Module } from "@akasha/code-system/module"

export const leadsAlerts = {
  id: "01a06274-b08a-77f0-a356-788741ca9970",
  pageTypeSlug: "module",
  slug: "leads-alerts",
  definition: "the count of leads about to expire, and the pledges holding one",
  code: "ts",
} as const satisfies Module
