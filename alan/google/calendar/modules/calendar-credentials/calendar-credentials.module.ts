import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calendarCredentials = {
  id: "01a05c02-c733-7786-85fd-8163fb8a237b",
  type: "page-type/module",
  slug: "calendar-credentials",
  definition: "what builds a calendar client",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service account key arrives with its newlines escaped and is restored here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default calendar id that is empty counts as no id given.",
    },
  ],
} as const satisfies Module
