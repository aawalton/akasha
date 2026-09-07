import type { Domain } from "../../domains/domain.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { ChangeTargetSubtypeParentSlug } from "../properties/change-target-subtype-parent-slug.relation-property.ts"
import type { ChangeTargetTypeSlug } from "../properties/change-target-type-slug.relation-property.ts"

export type ChangeTargetSubtype = Domain & {
  changeTargetTypeSlug: ChangeTargetTypeSlug
  parentSlug?: ChangeTargetSubtypeParentSlug
}

export const changeTargetSubtype = {
  id: "01a07c71-2924-76f9-b37f-a239b7b97045",
  pageTypeSlug: "page-type",
  slug: "change-target-subtype",
  definition: "a narrower sort of thing a change acts on",
  pluralSlug: "change-target-subtypes",
  partSlugs: [
    "relation-property/change-target-subtype-parent-slug",
    "change-target-subtype/file",
    "change-target-subtype/file-code",
    "change-target-subtype/file-page",
    "change-target-subtype/file-page-type",
    "change-target-subtype/file-page-property",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "relation-property/change-target-type-slug", required: true, many: false },
    {
      pagePropertySlug: "relation-property/change-target-subtype-parent-slug",
      required: false,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target subtype narrows one target type.",
    },
    {
      invariantKind: "departure",
      statement: "A target subtype narrowing another target subtype names that one as its parent.",
    },
    {
      invariantKind: "departure",
      statement: "A target subtype naming no parent narrows its target type alone.",
    },
    {
      invariantKind: "departure",
      statement: "A target subtype narrows the target type its parent narrows.",
    },
  ],
} as const satisfies PageType
