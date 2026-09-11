import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const refusalHolding = {
  id: "01a09262-8dcd-7000-9ba4-db03acc57a04",
  type: "module",
  slug: "refusal-holding",
  definition: "refusals held to a byte ceiling, and a reason shortened to say how much went",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal is carried by its lines rather than as one run of words.",
    },
    {
      invariantKind: "departure",
      statement: "A reason held only in part says how much of that reason went.",
    },
    {
      invariantKind: "departure",
      statement:
        "More refusals than the ceiling holds keep their start and say how many there are.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is handed in rather than stated here, so each reader holds its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or runs a check.",
    },
  ],
} as const satisfies Module
