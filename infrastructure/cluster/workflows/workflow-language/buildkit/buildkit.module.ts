import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const buildkit = {
  id: "01a07740-d031-7c82-8d85-3e72173a776d",
  pageTypeSlug: "module",
  slug: "buildkit",
  definition: "a step building an image through buildctl, retried where the failure was in passing",
  code: "ts",
} as const satisfies Module
