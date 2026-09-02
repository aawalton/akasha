import type { Module } from "@akasha/code-system/module"

export const pageEntries = {
  id: "01a05fa9-de48-7998-bf7c-a433b344bba0",
  pageTypeSlug: "module",
  slug: "page-entries",
  definition: "the values a page keeps one to a line in a file beside the page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property whose page type is `page-property-entry` keeps its values beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file's name is the page's name followed by the property's slug and the extension stated.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line carries no value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the page names that is not there is refused rather than read as holding nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is no JSON object is refused rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "An empty file is answered with an empty list rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "The values read here are written over the extension the page states.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
