import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const rbacTypes = {
  id: "01a07740-d031-781d-95c7-d652fbd17ab2",
  pageTypeSlug: "module",
  slug: "rbac-types",
  definition: "the shape of a namespace role profile and of the rules it grants",
  code: "ts",
} as const satisfies Module
