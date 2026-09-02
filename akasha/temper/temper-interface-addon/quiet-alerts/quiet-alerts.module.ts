import type { Module } from "@akasha/code-system/module"

export const quietAlerts = {
  id: "01a060f1-690b-7fc1-8e15-08f2f0506b39",
  pageTypeSlug: "module",
  slug: "quiet-alerts",
  definition: "the alert texts the add-on holds back",
  code: "ts",
} as const satisfies Module
