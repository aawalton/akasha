import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const recoveryCount = {
  id: "01a0d937-c6b8-7986-998d-4da80edbfda2",
  type: "page-type/number-property",
  slug: "recovery-count",
  propertySlug: "recovery-count",
  definition: "how many times a device let go of a refused secret and minted another",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
