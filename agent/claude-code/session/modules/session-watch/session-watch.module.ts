import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sessionWatch = {
  id: "01a06983-278f-7765-a092-a4267cf79118",
  type: "page-type/module",
  slug: "session-watch",
  definition: "a live transcript found and recorded on the seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript found is recorded on the seat that owns it.",
    },
  ],
} as const satisfies Module
