import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const addressRestating = {
  id: "01a09c32-ce10-789c-bc0c-792c98ca95e4",
  type: "module",
  slug: "address-restating",
  definition: "the edits restating many pages' addresses over one reading of the bodies",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every address handed in is restated over one reading of the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling is found by the parse rather than by matching the text of the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body is parsed only where its text spells the page type of an address.",
    },
    {
      invariantKind: "departure",
      statement: "A body spelling no address handed in is read and left alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which bodies are read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether an address is an address.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
  ],
} as const satisfies Module
