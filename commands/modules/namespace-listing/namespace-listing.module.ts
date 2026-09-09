import type { Module } from "@akasha/code/module"

export const namespaceListing = {
  id: "01a08146-1d75-7803-8785-04ee4abd9a06",
  pageTypeSlug: "module",
  slug: "namespace-listing",
  definition: "the commands a namespace has, written down for a reader",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part is listed by the words past the name of the namespace with it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A part whose slug opens with another name than its namespace's is listed nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a part names is dropped, as a part is reached by its slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "A hyphen between two words of a slug is written as a space.",
    },
    {
      invariantKind: "departure",
      statement: "A part is listed with the definition handed for that part.",
    },
    {
      invariantKind: "departure",
      statement: "A part handed no definition is listed by name alone.",
    },
    {
      invariantKind: "departure",
      statement: "The names are padded to the widest of them so the definitions line up.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace with no part is written down as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a page.",
    },
  ],
} as const satisfies Module
