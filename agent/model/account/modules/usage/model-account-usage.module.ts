import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountUsage = {
  id: "01a069cf-7042-7002-be6e-85399cf7d1f7",
  type: "page-type/module",
  slug: "model-account-usage",
  definition: "how code reads what the model accounts spend",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account carrying no reading is left out of the mean.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout naming no account is refused rather than answered as a fleet.",
    },
  ],
} as const satisfies Module
