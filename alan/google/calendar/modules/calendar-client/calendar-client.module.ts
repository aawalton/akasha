import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calendarClient = {
  id: "01a05c02-c734-7867-9667-e2b5e7b76a25",
  type: "page-type/module",
  slug: "calendar-client",
  definition: "how code reaches a Google calendar with a credential",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The default calendar id is read when the client is made.",
    },
  ],
  createdAt: "2026-09-01T08:08:01.076Z",
  updatedAt: "2026-10-30T15:33:33.165Z",
} as const satisfies Module
