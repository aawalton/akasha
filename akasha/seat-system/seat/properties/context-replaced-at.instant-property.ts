import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type ContextReplacedAt = string

export const contextReplacedAt = {
  id: "01a0542e-ab3e-77e9-a0e2-f1e94726bd01",
  pageTypeSlug: "instant-property",
  slug: "context-replaced-at",
  propertySlug: "context-replaced-at",
  definition: "when a seat's context was last replaced",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A context carried across a restart replaces nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read taken before this is no longer the seat's, the context that took it being gone.",
    },
  ],
} as const satisfies InstantProperty
