import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reminderListing = {
  id: "01a18da6-d48b-74c9-ae84-f21ac64e9f62",
  type: "page-type/module",
  slug: "reminder-listing",
  definition: "how code finds every reminder",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reminders are read from the index rather than by walking a folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The persona a reminder is sent to and from reads back as the slug alone.",
    },
  ],
  createdAt: "2026-10-30T16:31:23.274Z",
  updatedAt: "2026-10-30T16:31:23.274Z",
} as const satisfies Module
