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
  createdAt: "2026-09-01T08:08:01.076Z",
  updatedAt: "2026-09-22T13:45:29.000Z",
} as const satisfies Module
