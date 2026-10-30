import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const proofStatus = {
  id: "01a0657f-5da8-72f1-8408-a6f70813c9f3",
  type: "page-type/select-property",
  slug: "proof-status",
  propertySlug: "proof-status",
  definition: "how far Alan has written a proof",
  values: ["draft", "complete", "abandoned"],
  types: "ts",
  createdAt: "2026-09-03T04:20:41.000Z",
  updatedAt: "2026-10-30T16:44:29.210Z",
} as const satisfies SelectProperty
