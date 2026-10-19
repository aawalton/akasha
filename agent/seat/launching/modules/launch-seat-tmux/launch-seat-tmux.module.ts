import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const launchSeatTmux = {
  id: "01a06983-278f-7269-bd88-794f83800559",
  type: "page-type/module",
  slug: "launch-seat-tmux",
  definition: "how code runs a seat supervisor in a tmux session",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Tmux refuses a command longer than about sixteen thousand bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's prompt reaches its supervisor in a file rather than on the command line tmux is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A respawned seat is handed its prompt the way a seat launched fresh is.",
    },
  ],
  createdAt: "2026-09-03T23:03:18.159Z",
  updatedAt: "2026-10-19T20:11:57.868Z",
} as const satisfies Module
