import type { Module } from "../../code-system/module/module.page-type.ts"

export const indexEntries = {
  id: "01a04b79-16c5-70d4-884a-66c95ddbec0d",
  pageTypeSlug: "module",
  slug: "index-entries",
  definition: "the entries a page's value implies",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's body can be loaded after the file it came from is gone.",
    },
    {
      invariantKind: "departure",
      statement: "A property's target is read from the index rather than from the corpus.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name saying its own page type is held to the target its property declares, so naming a page of the wrong type is refused rather than resolved.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that narrows to more than one page is refused, never resolved to one of them.",
    },
    {
      invariantKind: "departure",
      statement: "A value the index cannot resolve is reported, never thrown.",
    },
  ],
} as const satisfies Module
