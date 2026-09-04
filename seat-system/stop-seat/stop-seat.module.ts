import type { Module } from "@akasha/code-system/module"

export const stopSeat = {
  id: "01a06983-278f-7b86-8379-e1f7fb7a4d60",
  pageTypeSlug: "module",
  slug: "stop-seat",
  definition: "a seat stopped: its processes killed, its subagents guarded, its page removed",
  code: "ts",
} as const satisfies Module
