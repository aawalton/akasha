import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rbacTypes = {
  id: "01a06f10-7000-7007-b0007-9d4a2f6c0007e1",
  pageTypeSlug: "module",
  slug: "rbac-types",
  definition: "the shape of a namespace role profile and of the rules it grants",
  code: "ts",
} as const satisfies Module
