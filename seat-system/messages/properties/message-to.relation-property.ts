import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type MessageTo = Slug

export const messageTo = {
  id: "01a06818-107b-7000-9af9-d98a9e34ceed",
  pageTypeSlug: "relation-property",
  slug: "message-to",
  propertySlug: "to",
  definition: "the seat a message is addressed to",
  targetPageType: "page-type/seat",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message addressed to a name no seat has is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A recipient is one name rather than a path.",
    },
  ],
} as const satisfies RelationProperty
