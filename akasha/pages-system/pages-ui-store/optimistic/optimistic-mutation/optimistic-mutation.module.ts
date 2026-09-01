import type { Module } from "@akasha/code-system/module"

export const optimisticMutation = {
  id: "01a05b69-454a-7b13-a861-a18e0f5f1b8c",
  pageTypeSlug: "module",
  slug: "optimistic-mutation",
  definition: "a page write shown before it lands and settled once it does",
  code: "ts",
} as const satisfies Module
