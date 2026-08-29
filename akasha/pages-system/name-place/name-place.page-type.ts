import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { NameFormatSlug } from "../page-property/properties/name-format-slug.relation-property.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type NamePlace = Domain & {
  nameFormatSlug: NameFormatSlug | null
}

export const namePlace = {
  id: "01a04fc9-2ad4-7896-ae44-4569ddae3f7e",
  pageTypeSlug: "page-type",
  slug: "name-place",
  definition: "a place a name appears, and the format it is written in there",
  partSlugs: [
    "name-place/component-identifier",
    "name-place/constant-identifier",
    "name-place/derived-identifier",
    "name-place/file-name",
    "name-place/file-role",
    "name-place/folder-name",
    "name-place/function-identifier",
    "name-place/listing-href",
    "name-place/page-href",
    "name-place/route-parameter",
    "name-place/route-segment",
    "name-place/type-identifier",
  ],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "name-format-slug", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A format says how a name is written; a place says where a name appears and which format holds there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a page property carries states its format on the property, so no place spells that binding again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A place is defined whether or not a file in akasha carries such a name yet, so the standard stands ready before what it governs arrives.",
    },
    {
      invariantKind: "departure",
      statement:
        "A place stating no format holds no name at all, or holds one whose owner stands outside akasha, or holds a name built of parts each named elsewhere, and says which in its own invariants.",
    },
    {
      invariantKind: "gap",
      statement:
        "A place says in prose where it holds, so a check reaching one still carries its own reach.",
    },
  ],
} as const satisfies PageType
