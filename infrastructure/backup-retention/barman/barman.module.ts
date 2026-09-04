import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const barman = {
  id: "01a06863-74e9-7ccb-a06f-b9cdaa0c77cb",
  pageTypeSlug: "module",
  slug: "barman",
  definition: "the barman commands the backup store is listed and marked through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command that exits non-zero is an error carrying what the command said.",
    },
    {
      invariantKind: "departure",
      statement: "A marking is read back from the store rather than assumed from the command.",
    },
  ],
} as const satisfies Module
