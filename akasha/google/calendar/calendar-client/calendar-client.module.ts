import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const calendarClient = {
  id: "01a05c02-c734-7867-9667-e2b5e7b76a25",
  pageTypeSlug: "module",
  slug: "calendar-client",
  definition: "the calendar API bound to an authorised client",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The default calendar id is read when the client is made.",
    },
  ],
} as const satisfies Module
