import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const killTargetPlan = {
  id: "01a06983-278f-7720-b731-2e7ba480b718",
  type: "module",
  slug: "kill-target-plan",
  definition: "which of pids, a tmux session, or a reconcile a kill acts on",
  code: "ts",
} as const satisfies Module
