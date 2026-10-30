import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const exerciseLevel = {
  id: "01a0657e-2bbf-7f68-a4a5-f41e8a919b89",
  type: "page-type/select-property",
  slug: "exercise-level",
  propertySlug: "exercise-level",
  definition:
    "how much practice a strength exercise needs before Alan adds weight to the strength exercise",
  values: ["beginner", "expert", "intermediate"],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.687Z",
  updatedAt: "2026-10-30T16:53:31.894Z",
} as const satisfies SelectProperty
