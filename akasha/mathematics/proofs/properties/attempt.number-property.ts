import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Attempt = number

export const attempt = {
  id: "01a0657f-5da8-78fc-8867-129a7c5694f9",
  pageTypeSlug: "number-property",
  slug: "attempt",
  propertySlug: "attempt",
  definition: "which try at one proposition a proof is, counting from one",
  max: null,
} as const satisfies NumberProperty
