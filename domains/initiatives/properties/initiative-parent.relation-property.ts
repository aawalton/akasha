import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type InitiativeParent = Slug

export const initiativeParent = {
  id: "01a04e58-5735-7668-9aee-b2da5c7b346a",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "initiative-parent",
  propertySlug: "parent",
  definition: "the initiative an initiative sits under",
  targetPageType: "page-type/initiative",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative lists nothing beneath that initiative.",
    },
    {
      invariantKind: "departure",
      statement: "This edge is read inverted.",
    },
  ],
} as const satisfies RelationProperty
