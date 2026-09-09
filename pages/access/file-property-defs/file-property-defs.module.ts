import type { Module } from "@akasha/code/module"

export const filePropertyDefs = {
  id: "01a05bd6-c530-72bb-9046-ba72f58fad9b",
  pageTypeSlug: "module",
  type: "module",
  slug: "file-property-defs",
  definition: "the property definitions a file-backed page type declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The property definitions a page type declares are asked of `@akasha/pages-service`.",
    },
    {
      invariantKind: "absence",
      statement: "An empty list is never answered for a page type that is there.",
    },
    {
      invariantKind: "departure",
      statement: "A page type nothing has is answered as null rather than as an empty list.",
    },
    {
      invariantKind: "departure",
      statement: "A shape answered once is held for every later question.",
    },
    {
      invariantKind: "departure",
      statement: "A shape refused is asked for again.",
    },
    {
      invariantKind: "departure",
      statement: "A shape has the property naming the account a page belongs to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A definition's type is how a value is rendered rather than the page type declaring that property.",
    },
    {
      invariantKind: "departure",
      statement: "Every property page type is named here beside the type a screen draws.",
    },
    {
      invariantKind: "departure",
      statement: "A property page type named nowhere here is rendered as text.",
    },
    {
      invariantKind: "absence",
      statement: "No type a screen has no drawing for leaves here.",
    },
  ],
} as const satisfies Module
