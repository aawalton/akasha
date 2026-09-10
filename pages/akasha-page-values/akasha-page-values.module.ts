import type { Module } from "@akasha/code/module"

export const akashaPageValues = {
  id: "01a068a4-60f0-7005-b761-625a83147b3e",
  pageTypeSlug: "module",
  type: "module",
  slug: "akasha-page-values",
  definition:
    "the values an akasha page declares, in the shape the query engine reads a markdown page in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page's camel keys become the kebab spelling every reader below this module uses.",
    },
    {
      invariantKind: "departure",
      statement: "A key already kebab is unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "Kebabising a kebab key answers the same key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slug and a page type come off the file name only where the body states no slug and no page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose body will not load answers with nothing rather than with an empty page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The values a page keeps outside the commit are put back before any value is read.",
    },
    {
      invariantKind: "departure",
      statement: "An entry property is left as its declaration says.",
    },
    {
      invariantKind: "departure",
      statement: "The rows beside a page are found.",
    },
    {
      invariantKind: "departure",
      statement:
        "An akasha page and a markdown page are one population, read here by one reader rather than two.",
    },
  ],
} as const satisfies Module
