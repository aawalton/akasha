import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type ContextReplacedAt = string

export const contextReplacedAt = {
  id: "01a0542e-ab3e-77e9-a0e2-f1e94726bd01",
  pageTypeSlug: "instant-property",
  slug: "context-replaced-at",
  propertySlug: "context-replaced-at",
  definition: "when a seat last came by the context it is working in",
} as const satisfies InstantProperty
