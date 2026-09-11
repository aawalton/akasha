import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const emptyBadge = {
  id: "01a05b55-a539-71ed-8bff-e04f82a5512a",
  type: "module",
  slug: "empty-badge",
  definition: "a badge sitting where a value is absent",
  code: "tsx",
} as const satisfies Module
