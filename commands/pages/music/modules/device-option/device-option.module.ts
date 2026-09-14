import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deviceOption = {
  id: "01a0a01d-7643-7622-9825-c312b57d8474",
  type: "module",
  slug: "device-option",
  definition: "the Spotify device a music command acts on, as the call names it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A call naming no device leaves the option empty, so Spotify takes the active one.",
    },
    {
      invariantKind: "departure",
      statement: "A device named is carried into the option and into what the report says.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
} as const satisfies Module
