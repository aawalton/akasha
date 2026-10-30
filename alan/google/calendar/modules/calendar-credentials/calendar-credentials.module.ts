import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calendarCredentials = {
  id: "01a05c02-c733-7786-85fd-8163fb8a237b",
  type: "page-type/module",
  slug: "calendar-credentials",
  definition: "how code reads the environment variables a calendar call needs",
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
  createdAt: "2026-09-01T08:08:01.075Z",
  updatedAt: "2026-10-30T15:33:51.541Z",
} as const satisfies Module
