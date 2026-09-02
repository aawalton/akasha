import type { Module } from "@akasha/code-system/module"

export const dataEncodeDecoder = {
  id: "01a06061-969f-7339-89aa-da319bf80d6b",
  pageTypeSlug: "module",
  slug: "data-encode-decoder",
  definition: "encoded lines read back into the Lua value the lines were written from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The lines are read as one run of characters across the line breaks.",
    },
    {
      invariantKind: "departure",
      statement: "A control character says which reader takes the characters following.",
    },
    {
      invariantKind: "departure",
      statement: "A dictionary header is read before anything else where a header is there.",
    },
    {
      invariantKind: "constraint",
      statement: "A global dictionary shorter than the header asks for raises an error.",
    },
    {
      invariantKind: "departure",
      statement: "The decoder answers the value and the dictionary the value was read with.",
    },
  ],
} as const satisfies Module
