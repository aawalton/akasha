import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Puzzles = "jsonl"

export const puzzles = {
  id: "01a06582-bd62-7cb1-8ecf-f95e81141aa9",
  pageTypeSlug: "page-property-entry",
  slug: "puzzles",
  propertySlug: "puzzles",
  definition: "every puzzle a set holds, one to a line",
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "puzzle-id", required: true, many: false },
    { pagePropertySlug: "fen", required: true, many: false },
    { pagePropertySlug: "puzzle-moves", required: true, many: false },
    { pagePropertySlug: "puzzle-rating", required: true, many: false },
    { pagePropertySlug: "rating-deviation", required: true, many: false },
    { pagePropertySlug: "popularity", required: true, many: false },
    { pagePropertySlug: "nb-plays", required: true, many: false },
    { pagePropertySlug: "puzzle-themes", required: true, many: true, max: null },
    { pagePropertySlug: "game-url", required: true, many: false },
    { pagePropertySlug: "puzzle-license", required: true, many: false },
    { pagePropertySlug: "solver-color", required: true, many: false },
    { pagePropertySlug: "opening-tags", required: false, many: true, max: null },
    { pagePropertySlug: "solved", required: false, many: false },
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
