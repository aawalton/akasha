import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rbacApply = {
  id: "01a06f10-7000-700d-b000d-9d4a2f6c000de1",
  pageTypeSlug: "module",
  slug: "rbac-apply",
  definition: "a step putting a namespace's role profiles and their bindings onto the cluster",
  code: "ts",
} as const satisfies Module
