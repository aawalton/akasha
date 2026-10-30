import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reminderNextTime = {
  id: "01a18da6-d48b-70f2-a944-71842374185f",
  type: "page-type/module",
  slug: "reminder-next-time",
  definition: "how code asks systemd for the next time a reminder is sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Systemd answers when a schedule next falls due.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A schedule naming no time still to come is answered as never.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
  ],
  createdAt: "2026-10-30T16:31:23.274Z",
  updatedAt: "2026-10-30T16:31:23.274Z",
} as const satisfies Module
