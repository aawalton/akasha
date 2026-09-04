import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type ChronologyAnchors = "jsonl"

export const chronologyAnchors = {
  id: "01a0685e-ef8a-71e6-87f4-7f7e2c65e093",
  pageTypeSlug: "page-property-entry",
  slug: "chronology-anchors",
  propertySlug: "chronology-anchors",
  definition: "every place a chapter dates something, one place to a line",
  properties: [
    { pagePropertySlug: "anchor-kind", required: true, many: false },
    { pagePropertySlug: "anchor-tier", required: true, many: false },
    { pagePropertySlug: "anchor-lexeme", required: true, many: false },
    { pagePropertySlug: "anchor-reference", required: true, many: false },
    { pagePropertySlug: "anchor-standing", required: true, many: false },
    { pagePropertySlug: "anchor-chapter", required: true, many: false },
    { pagePropertySlug: "anchor-direction", required: false, many: false },
    { pagePropertySlug: "anchor-claimed-by", required: false, many: false },
    { pagePropertySlug: "anchor-volume", required: false, many: false },
    { pagePropertySlug: "anchor-beat", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An anchor is one place in one chapter rather than a date the chapter carries.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor carries the words that date the anchor.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor naming nobody who claimed it is one the story itself tells.",
    },
    {
      invariantKind: "gap",
      statement: "Every chapter a world's chronology rests on carries its anchors here.",
    },
  ],
} as const satisfies PagePropertyEntry
