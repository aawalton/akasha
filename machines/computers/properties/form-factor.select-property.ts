import type { SelectProperty } from "@akasha/pages-system/select-property"

export const formFactor = {
  id: "01a0658c-329a-7f51-8e21-80f6d2aded06",
  pageTypeSlug: "select-property",
  slug: "form-factor",
  propertySlug: "form-factor",
  definition: "whether it sits on a desk or travels",
  values: ["desktop", "laptop"],
} as const satisfies SelectProperty

export type FormFactor = (typeof formFactor.values)[number]
