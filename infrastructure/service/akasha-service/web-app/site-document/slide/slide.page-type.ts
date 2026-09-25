import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const slide = {
  id: "01a0d622-64e3-7cfd-be30-26b97799dd66",
  type: "page-type/page-type",
  slug: "slide",
  definition: "one screen of a deck a site document shows",
  extends: ["page-type/page"],
  parts: [
    "relation-property/slide-deck",
    "number-property/slide-number",
    "select-property/slide-kind",
    "record-property/slide-points",
    "text-property/slide-point-value",
    "select-property/slide-point-color",
    "number-property/slide-point-fill",
    "select-property/slide-point-icon",
    "text-property/slide-closer",
    "text-property/slide-image",
    "text-property/slide-image-caption",
  ],
  properties: [
    { pageProperty: "relation-property/slide-deck", required: true, many: false },
    { pageProperty: "number-property/slide-number", required: true, many: false },
    { pageProperty: "select-property/slide-kind", required: true, many: false },
    { pageProperty: "text-property/site-document-lead", required: false, many: false },
    { pageProperty: "record-property/slide-points", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/slide-closer", required: false, many: false },
    { pageProperty: "text-property/slide-image", required: false, many: false },
    { pageProperty: "text-property/slide-image-caption", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deck is a site document, and its slides are shown in the order of their numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slide's kind picks how the web app lays that slide out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A visitor who is not signed in reads every slide.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
