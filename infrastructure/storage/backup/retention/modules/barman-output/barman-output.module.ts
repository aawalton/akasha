import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const barmanOutput = {
  id: "01a06863-74e7-786f-8c4a-33d1de1b872b",
  type: "page-type/module",
  slug: "barman-output",
  definition: "what barman's own output states, read into the shapes this package has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Output that does not parse is an error rather than an empty listing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field barman adds that this package does not read is carried through untouched.",
    },
  ],
} as const satisfies Module
