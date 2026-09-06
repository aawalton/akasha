import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Puzzles = "jsonl"

export const puzzles = {
  id: "01a06582-bd62-7cb1-8ecf-f95e81141aa9",
  pageTypeSlug: "page-property-entry",
  slug: "puzzles",
  propertySlug: "puzzles",
  definition: "every puzzle a set holds, one to a line",
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "text-property/puzzle-id", required: true, many: false },
    { pagePropertySlug: "text-property/fen", required: true, many: false },
    { pagePropertySlug: "text-property/puzzle-moves", required: true, many: false },
    { pagePropertySlug: "number-property/puzzle-rating", required: true, many: false },
    { pagePropertySlug: "number-property/rating-deviation", required: true, many: false },
    { pagePropertySlug: "number-property/popularity", required: true, many: false },
    { pagePropertySlug: "number-property/nb-plays", required: true, many: false },
    { pagePropertySlug: "text-property/puzzle-themes", required: true, many: true, max: null },
    { pagePropertySlug: "url-property/game-url", required: true, many: false },
    { pagePropertySlug: "text-property/puzzle-license", required: true, many: false },
    { pagePropertySlug: "select-property/solver-color", required: true, many: false },
    { pagePropertySlug: "text-property/opening-tags", required: false, many: true, max: null },
    { pagePropertySlug: "boolean-property/solved", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A puzzle is a row here rather than a page of its own.",
    },
    {
      invariantKind: "absence",
      statement: "A row nobody has answered carries no answer.",
    },
    {
      invariantKind: "absence",
      statement: "A row is taken from the set's source rather than composed here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row is keyed on the id its source gives the puzzle, so one puzzle read twice is one row.",
    },
  ],
} as const satisfies PagePropertyEntry
