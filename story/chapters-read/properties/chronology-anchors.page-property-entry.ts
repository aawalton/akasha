import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type ChronologyAnchors = "jsonl"

export const chronologyAnchors = {
  id: "01a0685e-ef8a-71e6-87f4-7f7e2c65e093",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "chronology-anchors",
  propertySlug: "chronology-anchors",
  definition: "every place a chapter dates something, one place to a line",
  properties: [
    { pageProperty: "select-property/anchor-kind", required: true, many: false },
    { pageProperty: "select-property/anchor-tier", required: true, many: false },
    { pageProperty: "text-property/anchor-lexeme", required: true, many: false },
    { pageProperty: "text-property/anchor-reference", required: true, many: false },
    { pageProperty: "select-property/anchor-standing", required: true, many: false },
    { pageProperty: "text-property/anchor-chapter", required: true, many: false },
    { pageProperty: "select-property/anchor-direction", required: false, many: false },
    { pageProperty: "text-property/anchor-claimed-by", required: false, many: false },
    { pageProperty: "number-property/anchor-volume", required: false, many: false },
    { pageProperty: "number-property/anchor-beat", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An anchor is one place in one chapter rather than a date the chapter has.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor has the words that date the anchor.",
    },
    {
      invariantKind: "departure",
      statement:
        "An anchor naming nobody who claimed that anchor is an anchor the story itself tells.",
    },
    {
      invariantKind: "gap",
      statement: "Every chapter a world's chronology rests on has its anchors here.",
    },
  ],
} as const satisfies PagePropertyEntry
