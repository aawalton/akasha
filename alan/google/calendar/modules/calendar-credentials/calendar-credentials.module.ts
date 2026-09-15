import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calendarCredentials = {
  id: "01a05c02-c733-7786-85fd-8163fb8a237b",
  type: "module",
  slug: "calendar-credentials",
  definition: "what a calendar client is built with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service account key arrives with its newlines escaped and is restored here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default calendar id that is empty counts as no id given.",
    },
  ],
} as const satisfies Module
