import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const refusing = {
  id: "01a08cba-d78e-707e-a8b3-0f8748457353",
  type: "module",
  slug: "refusing",
  definition: "a command's answer where the call is refused",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal answers with the reasons given and reports nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What was mistaken is said before what was wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A call with anything mistaken is refused as a fault of the call.",
    },
    {
      invariantKind: "departure",
      statement: "A call wrong with nothing mistaken is refused as a fault of the data.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing mistaken and nothing wrong is no refusal at all.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal over a change says nothing was judged and nothing was written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out what is mistaken or wrong.",
    },
  ],
} as const satisfies Module
