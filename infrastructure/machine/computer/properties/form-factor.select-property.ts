import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const formFactor = {
  id: "01a0658c-329a-7f51-8e21-80f6d2aded06",
  type: "page-type/select-property",
  slug: "form-factor",
  propertySlug: "form-factor",
  definition: "whether it sits on a desk or travels",
  values: ["desktop", "laptop"],
  types: "ts",
} as const satisfies SelectProperty
