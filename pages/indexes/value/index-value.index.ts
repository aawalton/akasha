import type { Index } from "../index/index.page-type.ts"

export const indexValue = {
  id: "01a05a6c-58a0-7619-8d8c-32d90706a524",
  pageTypeSlug: "index",
  slug: "index-value",
  definition: "an index from a page type to the values its pages carry",
  name: "value",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value file is found by the page type whose pages the value file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the page's path and the whole value its body declares.",
    },
    {
      invariantKind: "departure",
      statement: "A file holds one line for each page of its page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every value a page of one page type carries is one file read.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no page type is filed here by nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A value standing in a file beside a page is not filed here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing filed here says which pages name a page.",
    },
  ],
} as const satisfies Index
