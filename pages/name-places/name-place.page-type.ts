import type { Domain } from "@akasha/domains/domain"
import type { NameFormatSlug } from "../text-properties/properties/name-format-slug.relation-property.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type NamePlace = Domain & {
  nameFormatSlug: NameFormatSlug | null
}

export const namePlace = {
  id: "01a04fc9-2ad4-7896-ae44-4569ddae3f7e",
  pageTypeSlug: "page-type",
  slug: "name-place",
  definition: "a place a name appears, and the format it is written in there",
  pluralSlug: "name-places",
  partSlugs: [
    "name-place/component-identifier",
    "name-place/constant-identifier",
    "name-place/derived-identifier",
    "name-place/environment-variable",
    "name-place/file-name",
    "name-place/file-role",
    "name-place/folder-name",
    "name-place/foreign-name",
    "name-place/function-identifier",
    "name-place/listing-href",
    "name-place/package-name",
    "name-place/page-href",
    "name-place/property-key",
    "name-place/route-parameter",
    "name-place/route-segment",
    "name-place/type-identifier",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "name-format-slug", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name a page property carries states its format on the property.",
    },
    {
      invariantKind: "departure",
      statement: "A place is defined whether or not a file in akasha carries such a name yet.",
    },
    {
      invariantKind: "departure",
      statement: "A place stating no format says which in its own invariants.",
    },
    {
      invariantKind: "gap",
      statement: "A place says in prose where the place holds.",
    },
  ],
} as const satisfies PageType
