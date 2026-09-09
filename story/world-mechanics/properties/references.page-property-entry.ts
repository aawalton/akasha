import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type References = "jsonl"

export const references = {
  id: "01a06558-a991-78a4-abf8-48597f34d759",
  pageTypeSlug: "page-property-entry",
  slug: "references",
  propertySlug: "references",
  definition: "every place a story names a mechanic, one place to a line",
  properties: [
    { pageProperty: "text-property/chapter-slug", required: true, many: false },
    { pageProperty: "number-property/paragraph", required: true, many: false },
    { pageProperty: "text-property/wording", required: true, many: false },
    { pageProperty: "text-property/reference-event", required: true, many: false },
    { pageProperty: "text-property/holder-slug", required: false, many: false },
    { pageProperty: "text-property/holder-quote", required: false, many: false },
    { pageProperty: "text-property/effect-quote", required: false, many: false },
    { pageProperty: "boolean-property/claimed", required: false, many: false },
    { pageProperty: "text-property/claimed-by-slug", required: false, many: false },
    { pageProperty: "boolean-property/effect-claimed", required: false, many: false },
    { pageProperty: "text-property/reference-kind", required: false, many: false },
    { pageProperty: "number-property/reference-level", required: false, many: false },
    { pageProperty: "text-property/from-slug", required: false, many: false },
    { pageProperty: "text-property/to-slug", required: false, many: false },
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
      statement:
        "A quote is carried so a reading can be checked against the text that quote came from.",
    },
  ],
} as const satisfies PagePropertyEntry
