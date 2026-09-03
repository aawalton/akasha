import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const sourceSync = {
  id: "01a06f10-7000-7012-b0012-9d4a2f6c0012e1",
  pageTypeSlug: "module",
  slug: "source-sync",
  definition: "a step syncing a deployment's source tree to a commit through its sync container",
  code: "ts",
} as const satisfies Module
