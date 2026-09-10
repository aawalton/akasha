import type { PageType } from "../../../pages/types/page-type.page-type.types.ts"

export const changeTargetSubtype = {
  id: "01a07c71-2924-76f9-b37f-a239b7b97045",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "change-target-subtype",
  definition: "a narrower sort of thing a change acts on",
  pluralSlug: "change-target-subtypes",
  parts: [
    "relation-property/change-target-subtype-parent",
    "change-target-subtype/file",
    "change-target-subtype/file-code",
    "change-target-subtype/file-page",
    "change-target-subtype/file-page-type",
    "change-target-subtype/file-page-property",
    "change-target-subtype/folder",
    "change-target-subtype/folder-package",
    "change-target-subtype/file-content-code",
    "change-target-subtype/file-content-page-property-value",
    "change-target-subtype/file-content-page-property-value-prose",
    "change-target-subtype/page-type-page",
    "change-target-subtype/page-type-page-property",
    "change-target-subtype/file-content-manifest",
    "change-target-subtype/file-content-page-property-key",
    "change-target-subtype/page-property-property-slug",
    "change-target-subtype/prose-pattern",
    "change-target-subtype/file-content-page",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "relation-property/change-target-type", required: true, many: false },
    {
      pageProperty: "relation-property/change-target-subtype-parent",
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
  types: "ts",
} as const satisfies PageType
