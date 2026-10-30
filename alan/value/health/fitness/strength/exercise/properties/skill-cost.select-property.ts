import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const skillCost = {
  id: "01a0657e-2bc0-70b8-9883-2ec311b92460",
  type: "page-type/select-property",
  slug: "skill-cost",
  propertySlug: "skill-cost",
  definition: "how much attention Alan needs to perform a strength exercise without injury",
  values: ["high", "low", "moderate"],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.688Z",
  updatedAt: "2026-10-30T16:53:04.831Z",
} as const satisfies SelectProperty
