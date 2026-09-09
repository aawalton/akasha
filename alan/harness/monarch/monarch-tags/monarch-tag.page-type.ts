import type { PageType } from "@akasha/pages/page-type"
import type { MonarchRecord } from "../monarch-records/monarch-record.page-type.ts"
import type { TagColour } from "./properties/tag-colour.text-property.ts"
import type { TagPlace } from "./properties/tag-place.number-property.ts"

export type MonarchTag = MonarchRecord & {
  tagColour: TagColour
  tagPlace: TagPlace
}

export const monarchTag = {
  id: "01a0680a-1a00-700f-a758-9b2c6e3f110f",
  pageTypeSlug: "page-type",
  slug: "monarch-tag",
  definition: "a label applied to a transaction",
  pluralSlug: "monarch-tags",
  extends: ["page-type/monarch-record"],
  parts: ["number-property/tag-place", "text-property/tag-colour"],
  properties: [
    { pagePropertySlug: "text-property/tag-colour", required: true, many: false },
    { pagePropertySlug: "number-property/tag-place", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tag is made in Monarch by hand.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here creates a tag.",
    },
  ],
} as const satisfies PageType
