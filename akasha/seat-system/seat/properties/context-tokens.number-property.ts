import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type ContextTokens = number

export const contextTokens = {
  id: "01a0540f-f536-742b-bc8e-9887484f4426",
  pageTypeSlug: "number-property",
  slug: "context-tokens",
  propertySlug: "context-tokens",
  definition: "how much of the context window a seat has spent, in tokens",
  max: null,
} as const satisfies NumberProperty
