import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const calendarAuth = {
  id: "01a05c02-c734-78ed-a826-ea774f206b33",
  type: "module",
  slug: "calendar-auth",
  definition: "the client a calendar call is made through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a call made as Alan himself can answer an invitation.",
    },
  ],
} as const satisfies Module
