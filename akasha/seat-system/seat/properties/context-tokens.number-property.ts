import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type ContextTokens = number

export const contextTokens = {
  id: "01a05035-2609-7f28-84e3-be524d37684d",
  pageTypeSlug: "number-property",
  slug: "context-tokens",
  definition: "how much of the context window a seat has spent, in tokens",
  max: null,
} as const satisfies NumberProperty
