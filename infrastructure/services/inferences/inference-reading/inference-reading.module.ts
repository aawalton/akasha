import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inferenceReading = {
  id: "01a090a6-f40b-7abe-a439-ebc9274ece2a",
  type: "module",
  slug: "inference-reading",
  definition: "the inference service a page states, read from the index and the page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading naming no slug reaches every inference service.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no page is filed under is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A page that will not load refuses rather than reading as no service.",
    },
    {
      invariantKind: "departure",
      statement: "A page missing a value a service needs refuses rather than reading as a service.",
    },
    {
      invariantKind: "departure",
      statement: "One page that refuses refuses the whole reading.",
    },
    {
      invariantKind: "departure",
      statement: "The folder handed to the host is the folder the named script sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming a script no page is filed under is refused by name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a host.",
    },
  ],
} as const satisfies Module
