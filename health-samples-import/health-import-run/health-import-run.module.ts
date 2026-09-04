import type { Module } from "../../code-system/modules/module.page-type.ts"

export const healthImportRun = {
  id: "01a05c14-b11a-7004-981f-f20033c862ae",
  pageTypeSlug: "module",
  slug: "health-import-run",
  definition: "one import run, from the records read to the samples written",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Samples are written in batches so a run that stops has still landed what came before.",
    },
    {
      invariantKind: "departure",
      statement: "A run carries on from its checkpoint rather than from the start.",
    },
    {
      invariantKind: "departure",
      statement: "A run states what the run wrote for each metric rather than one total.",
    },
  ],
} as const satisfies Module
