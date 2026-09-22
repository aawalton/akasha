import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthImportReading = {
  id: "01a05c14-b11a-7005-9108-0d098d5f3aa7",
  type: "page-type/module",
  slug: "health-import-reading",
  definition: "what an import run says about itself once it is done",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that wrote every record the run read reads as imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that lost records reads as lossy and names the records the run lost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that cannot tell which records the run lost is taken as unsettled.",
    },
  ],
} as const satisfies Module
