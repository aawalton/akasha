import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const calendarCredentials = {
  id: "01a05c02-c733-7786-85fd-8163fb8a237b",
  pageTypeSlug: "module",
  slug: "calendar-credentials",
  definition: "what a calendar client is built with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service account key arrives with its newlines escaped and is restored here.",
    },
    {
      invariantKind: "departure",
      statement: "A default calendar id that is empty counts as none given.",
    },
  ],
} as const satisfies Module
