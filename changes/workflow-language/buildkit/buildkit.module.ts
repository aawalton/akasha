import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildkit = {
  id: "01a06f10-7000-7008-b0008-9d4a2f6c0008e1",
  pageTypeSlug: "module",
  slug: "buildkit",
  definition: "a step building an image through buildctl, retried where the failure was in passing",
  code: "ts",
} as const satisfies Module
