import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type EsoAddonSlug = Slug

export const esoAddonSlug = {
  id: "01a0819d-6872-7b9e-8c67-c011834d8ab8",
  pageTypeSlug: "relation-property",
  slug: "eso-addon-slug",
  propertySlug: "eso-addon-slug",
  definition: "the addon page the port holds",
  targetPageTypeSlug: "page-type/eso-addon",
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
