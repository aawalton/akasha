import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceOption = {
  id: "01a0a01d-7643-7622-9825-c312b57d8474",
  type: "page-type/module",
  slug: "device-option",
  definition: "the Spotify device a music command acts on, as the call names it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming no device leaves the option empty, so Spotify takes the active one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device named is carried into the option and into what the report says.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
} as const satisfies Module
