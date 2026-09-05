import type { Module } from "@akasha/code-system/module"

export const seatReviveVerifySignal = {
  id: "01a0686d-9d5e-700e-98bf-06b7ad829d40",
  pageTypeSlug: "module",
  slug: "seat-revive-verify-signal",
  definition: "what a verifying revive says became of the seat",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One signal names each way a verifying revive comes back.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that could not be verified is not a seat that failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an exit code.",
    },
  ],
} as const satisfies Module
