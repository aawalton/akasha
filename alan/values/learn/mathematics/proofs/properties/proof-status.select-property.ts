import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const proofStatus = {
  id: "01a0657f-5da8-72f1-8408-a6f70813c9f3",
  type: "select-property",
  slug: "proof-status",
  propertySlug: "proof-status",
  definition: "how far an attempt has been taken",
  values: ["draft", "complete", "abandoned"],
  types: "ts",
} as const satisfies SelectProperty
