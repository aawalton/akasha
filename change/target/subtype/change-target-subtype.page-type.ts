import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeTargetSubtype = {
  id: "01a07c71-2924-76f9-b37f-a239b7b97045",
  type: "page-type/page-type",
  slug: "change-target-subtype",
  definition: "a narrower sort of thing under a change",
  parts: [
    "change-target-subtype/file",
    "change-target-subtype/file-code",
    "change-target-subtype/file-content",
    "change-target-subtype/file-content-code",
    "change-target-subtype/file-content-entry-key",
    "change-target-subtype/file-content-manifest",
    "change-target-subtype/file-content-page",
    "change-target-subtype/file-content-page-property-key",
    "change-target-subtype/file-content-page-property-value",
    "change-target-subtype/file-content-page-property-value-prose",
    "change-target-subtype/file-manifest",
    "change-target-subtype/file-page",
    "change-target-subtype/file-page-property",
    "change-target-subtype/file-page-type",
    "change-target-subtype/folder",
    "change-target-subtype/page",
    "change-target-subtype/page-page-property",
    "change-target-subtype/page-property",
    "change-target-subtype/page-property-property-slug",
    "change-target-subtype/page-type-page",
    "change-target-subtype/page-type-page-property",
    "change-target-subtype/prose-pattern",
    "relation-property/change-target-subtype-parent",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target subtype narrows one target type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target subtype narrowing another target subtype names that one as its parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target subtype naming no parent narrows its target type alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target subtype narrows the target type its parent narrows.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
