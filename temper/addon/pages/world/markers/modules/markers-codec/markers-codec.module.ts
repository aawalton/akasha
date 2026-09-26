import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersCodec = {
  id: "01a0de85-2b4b-719b-9afe-447ebe64592c",
  type: "page-type/module",
  slug: "markers-codec",
  definition: "a zone's markers written as the profile string More Markers shares and read back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A profile string is the string More Markers writes, so either add-on reads the other's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A profile is saved as pieces of at most 1900 characters.",
    },
  ],
} as const satisfies Module
