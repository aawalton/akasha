import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceCheckout = {
  id: "01a08df8-2f20-7590-8d5b-082a6a92bfc1",
  type: "page-type/module",
  slug: "service-checkout",
  definition: "the checkout under which a workstation service's run reads and writes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout is the one the environment a unit states names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run the environment names no checkout for works under the directory that run started in.",
    },
  ],
} as const satisfies Module
