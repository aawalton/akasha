import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayScanWindow = {
  id: "01a06972-b4ce-7000-8e71-1439075d3afc",
  pageTypeSlug: "module",
  slug: "day-scan-window",
  definition: "how far back a tracking run reaches, and the small readings its callers share",
  code: "ts",
} as const satisfies Module
