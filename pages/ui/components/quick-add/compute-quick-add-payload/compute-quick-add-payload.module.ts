import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const computeQuickAddPayload = {
  id: "01a05c40-2195-72d5-b4b9-71ca0a1c440f",
  type: "module",
  slug: "compute-quick-add-payload",
  definition:
    "Merges fixed defaults, title, inline token tags, picker values and notes into a page payload.",
  code: "ts",
} as const satisfies Module
