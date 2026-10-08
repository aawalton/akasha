import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sessionWatch = {
  id: "01a06983-278f-7765-a092-a4267cf79118",
  type: "page-type/module",
  slug: "session-watch",
  definition: "how code finds the file of a seat's Claude Code session",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript found is recorded on the seat that owns it.",
    },
  ],
  createdAt: "2026-09-03T23:03:18.159Z",
  updatedAt: "2026-09-25T17:56:15.000Z",
} as const satisfies Module
