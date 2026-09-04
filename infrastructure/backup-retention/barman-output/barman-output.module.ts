import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const barmanOutput = {
  id: "01a06863-74e7-786f-8c4a-33d1de1b872b",
  pageTypeSlug: "module",
  slug: "barman-output",
  definition: "what barman's own output states, read into the shapes this package holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Output that does not parse is an error rather than an empty listing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A field barman adds that this package does not read is carried through untouched.",
    },
  ],
} as const satisfies Module
