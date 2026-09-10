import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type EsoAddon = Slug

export const esoAddon = {
  id: "01a0819d-6872-7b9e-8c67-c011834d8ab8",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "eso-addon",
  propertySlug: "eso-addon",
  definition: "the addon page the port holds",
  targetPageType: "page-type/eso-addon",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The package an addon's source is under is the folder that addon page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A tree move has the package path without an edit here.",
    },
  ],
} as const satisfies RelationProperty
