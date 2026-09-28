import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const launchSeatTmux = {
  id: "01a06983-278f-7269-bd88-794f83800559",
  type: "page-type/module",
  slug: "launch-seat-tmux",
  definition: "a seat supervisor launched inside a tmux session, and that session ended",
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
} as const satisfies Module
