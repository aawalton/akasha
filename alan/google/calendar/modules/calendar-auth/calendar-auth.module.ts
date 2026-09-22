import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calendarAuth = {
  id: "01a05c02-c734-78ed-a826-ea774f206b33",
  type: "page-type/module",
  slug: "calendar-auth",
  definition: "a calendar call's client",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a call made as Alan himself can answer an invitation.",
    },
  ],
} as const satisfies Module
