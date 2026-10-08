import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCardNotes = {
  id: "01a06257-46e6-787e-98f6-69ce573b0fa8",
  type: "page-type/module",
  slug: "page-card-notes",
  definition: "the notes a page card shows, edited in the card itself",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A card's notes are the value its listing row holds rather than a page read again.",
    },
  ],
  createdAt: "2026-09-02T13:38:02.086Z",
  updatedAt: "2026-09-24T22:01:20.000Z",
} as const satisfies Module
