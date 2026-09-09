import type { Module } from "@akasha/code/module"

export const storeSpelling = {
  id: "01a06369-1e85-764a-90a8-c72d834a1882",
  pageTypeSlug: "module",
  type: "module",
  slug: "store-spelling",
  definition: "a declared key put into the store's spelling on the way in and answered as both",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page moving into the store has its keys camelized on the way in.",
    },
    {
      invariantKind: "departure",
      statement: "A caller spells the key its page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A key goes to the store camelized and comes back under both spellings.",
    },
    {
      invariantKind: "departure",
      statement: "A key a caller already spells the store's way is left as the key is.",
    },
    {
      invariantKind: "departure",
      statement: "A key absent from every row of a non-empty answer is reported unfound.",
    },
    {
      invariantKind: "departure",
      statement: "The store leaves out a key the store has no column for.",
    },
    {
      invariantKind: "departure",
      statement: "The store answers null for a key the store has a column for.",
    },
    {
      invariantKind: "departure",
      statement:
        "The camel spelling and the declared spelling are written here rather than reached for.",
    },
    {
      invariantKind: "departure",
      statement:
        "Reaching those spellings would put a page-file reader behind a package that opens no page file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the store anything itself.",
    },
  ],
} as const satisfies Module
