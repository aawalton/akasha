import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingHolderTypes = {
  id: "01a06113-b7ce-7f67-beb7-a7a3ee79e25d",
  type: "page-type/module",
  slug: "housing-holder-types",
  definition: "the shape of every housing module's function holder",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "One holder typed in one place is how the ported add-on was written.",
    },
  ],
} as const satisfies Module
