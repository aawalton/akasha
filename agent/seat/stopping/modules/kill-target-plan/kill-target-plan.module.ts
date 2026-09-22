import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const killTargetPlan = {
  id: "01a06983-278f-7720-b731-2e7ba480b718",
  type: "page-type/module",
  slug: "kill-target-plan",
  definition: "whether a kill acts on pids, a tmux session, or a reconcile",
  code: "ts",
} as const satisfies Module
