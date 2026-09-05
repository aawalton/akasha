import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type References = "jsonl"

export const references = {
  id: "01a06558-a991-78a4-abf8-48597f34d759",
  pageTypeSlug: "page-property-entry",
  slug: "references",
  propertySlug: "references",
  definition: "every place a story names a mechanic, one place to a line",
  properties: [
    { pagePropertySlug: "chapter-slug", required: true, many: false },
    { pagePropertySlug: "paragraph", required: true, many: false },
    { pagePropertySlug: "wording", required: true, many: false },
    { pagePropertySlug: "reference-event", required: true, many: false },
    { pagePropertySlug: "holder-slug", required: false, many: false },
    { pagePropertySlug: "holder-quote", required: false, many: false },
    { pagePropertySlug: "effect-quote", required: false, many: false },
    { pagePropertySlug: "claimed", required: false, many: false },
    { pagePropertySlug: "claimed-by-slug", required: false, many: false },
    { pagePropertySlug: "effect-claimed", required: false, many: false },
    { pagePropertySlug: "reference-kind", required: false, many: false },
    { pagePropertySlug: "reference-level", required: false, many: false },
    { pagePropertySlug: "from-slug", required: false, many: false },
    { pagePropertySlug: "to-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reference is one place in one chapter rather than a count of places.",
    },
    {
      invariantKind: "departure",
      statement: "The wording is the text's own.",
    },
    {
      invariantKind: "departure",
      statement: "The mechanic's title need not match the wording.",
    },
    {
      invariantKind: "departure",
      statement: "A reference naming no holder is a reference the text attributed to no character.",
    },
    {
      invariantKind: "departure",
      statement: "A quote is carried so a reading can be checked against the text it came from.",
    },
  ],
} as const satisfies PagePropertyEntry
