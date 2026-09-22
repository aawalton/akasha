import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatConditionsReading = {
  id: "01a069bd-bdc5-709f-ba6f-cf8c3abe15bb",
  type: "page-type/module",
  slug: "seat-conditions-reading",
  definition: "what a seat runs under, read off the seat-conditions page as text and flags",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The conditions are read afresh at each ask rather than held from an earlier one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that refuses reaches whoever asked rather than being waited out here.",
    },
  ],
} as const satisfies Module
