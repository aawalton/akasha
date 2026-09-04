import type { Module } from "@akasha/code-system/module"

export const launchSeatTmux = {
  id: "01a06983-278f-7269-bd88-794f83800559",
  pageTypeSlug: "module",
  slug: "launch-seat-tmux",
  definition: "a seat supervisor launched inside a tmux session, and that session ended",
  code: "ts",
} as const satisfies Module
