import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingConstants = {
  id: "01a06160-2a5a-7eb0-829f-642f1db7b6b9",
  type: "page-type/module",
  slug: "trading-constants",
  definition:
    "the add-on's name, the namespace its listeners take, and the key its listings answer to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The add-on name is the one key every event name and every saved variables read is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Listings register under a namespace of their own rather than under the add-on name.",
    },
  ],
} as const satisfies Module
