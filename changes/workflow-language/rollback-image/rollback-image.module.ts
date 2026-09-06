import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rollbackImage = {
  id: "01a07740-d031-7b0f-a3d3-e0c114b9a9f6",
  pageTypeSlug: "module",
  slug: "rollback-image",
  definition: "the shell line undoing a deployment's last rollout",
  code: "ts",
} as const satisfies Module
