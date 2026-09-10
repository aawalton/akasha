import type { PageType } from "@akasha/pages/page-type"

export const identityStatement = {
  id: "01a0658a-739f-7d92-aed5-20be788a960f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "identity-statement",
  definition: "one sentence Alan means to become true of him",
  pluralSlug: "identity-statements",
  extends: ["page-type/page"],
  parts: [
    "number-property/identity-statement-level",
    "relation-property/identity-statement-value",
    "relation-property/parent-statement",
    "relation-property/replaced-by-statements",
    "relation-property/replaces-statements",
    "relation-property/sub-statements",
    "select-property/about",
    "select-property/identity-statement-rank",
    "select-property/identity-statement-status",
    "text-property/identity-statement-tags",
    "text-property/notion-id",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/about", required: false, many: false },
    { pageProperty: "number-property/identity-statement-level", required: true, many: false },
    { pageProperty: "text-property/notion-id", required: true, many: false },
    { pageProperty: "relation-property/parent-statement", required: false, many: false },
    { pageProperty: "select-property/identity-statement-rank", required: true, many: false },
    {
      pageProperty: "relation-property/replaced-by-statements",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "relation-property/replaces-statements",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "select-property/identity-statement-status", required: true, many: false },
    {
      pageProperty: "relation-property/sub-statements",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/identity-statement-tags",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "relation-property/identity-statement-value",
      required: true,
      many: false,
    },
    { pageProperty: "text-property/icon", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A statement sits at a rank saying how hard the statement is to hold and a level saying the progress.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supersession is stated on the superseding statement and on the superseded statement.",
    },
  ],
  types: "ts",
} as const satisfies PageType
