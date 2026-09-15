import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const namespaceListing = {
  id: "01a08146-1d75-7803-8785-04ee4abd9a06",
  type: "module",
  slug: "namespace-listing",
  definition: "the commands a namespace has, written down for a reader",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part is listed under the name handed for the namespace with it.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a part names is dropped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works a part's own name out of that part's slug.",
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
      statement: "The parts are written down sorted by the name each is listed under.",
    },
    {
      invariantKind: "absence",
      statement: "The order the parts were handed in reaches no listing.",
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
