import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatReviveVerifySignal = {
  id: "01a0686d-9d5e-700e-98bf-06b7ad829d40",
  type: "page-type/module",
  slug: "seat-revive-verify-signal",
  definition: "what a verifying revive says became of the seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One signal names each way a verifying revive comes back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that could not be verified is not a seat that failed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads an exit code.",
    },
  ],
} as const satisfies Module
