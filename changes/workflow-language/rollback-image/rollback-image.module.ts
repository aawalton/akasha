import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rollbackImage = {
  id: "01a06f10-7000-700f-b000f-9d4a2f6c000fe1",
  pageTypeSlug: "module",
  slug: "rollback-image",
  definition: "the shell line undoing a deployment's last rollout",
  code: "ts",
} as const satisfies Module
