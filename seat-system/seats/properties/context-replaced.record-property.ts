import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { ContextReplacedAt } from "./context-replaced-at.instant-property.ts"
import type { ContextReplacedSource } from "./context-replaced-source.text-property.ts"

export type ContextReplaced = {
  source: ContextReplacedSource
  at: ContextReplacedAt
}

export const contextReplaced = {
  id: "01a05810-00ab-7f91-824d-162870a1da3a",
  pageTypeSlug: "record-property",
  slug: "context-replaced",
  propertySlug: "context-replaced",
  definition: "how and when a seat last came by its context",
  properties: [
    { pagePropertySlug: "context-replaced-source", required: true, many: false },
    { pagePropertySlug: "context-replaced-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "How a seat came by its context and when the seat did are one fact.",
    },
    {
      invariantKind: "departure",
      statement: "A read taken before a context was started fresh is no longer the seat's read.",
    },
  ],
} as const satisfies RecordProperty
