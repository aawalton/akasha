import type { Module } from "@akasha/code-system/module"

export const akashaPageValues = {
  id: "01a068a4-60f0-7005-b761-625a83147b3e",
  pageTypeSlug: "module",
  slug: "akasha-page-values",
  definition:
    "the values an akasha page declares, in the shape the query engine reads a markdown page in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's camel keys become the kebab spelling every reader below this one uses.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key already kebab is unchanged, so kebabising a kebab key answers the same key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slug and a page type are taken off the file name only where the body states neither.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose body will not load answers with nothing rather than with an empty page.",
    },
    {
      invariantKind: "departure",
      statement: "What a page keeps outside the commit is put back before any value is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry property is left as its declaration says, so the rows beside a page are found.",
    },
  ],
} as const satisfies Module
