import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SequenceSlugs = List<Slug>

export const sequenceSlugs = {
  id: "01a063bd-a526-7413-bc66-6de0070c79c1",
  pageTypeSlug: "relation-property",
  slug: "sequence-slugs",
  propertySlug: "sequence-slugs",
  definition: "the readings a group expects to draw, in the order the group draws them",
  targetPageTypeSlug: "page-type/readout",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A group names the readings the group expects rather than reading the expectation off the readings.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading naming the group while the group names no reading back is a reading the group lost.",
    },
    {
      invariantKind: "departure",
      statement: "A group naming nothing expects whatever names the group.",
    },
  ],
} as const satisfies RelationProperty
