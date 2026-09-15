import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperWatcher = {
  id: "01a07c18-18d7-75c5-a461-d2efe805d0dc",
  type: "page-type/namespace",
  slug: "temper-watcher",
  definition: "the watcher running beside the game",
  parts: ["command/temper-watcher-log", "command/temper-watcher-status"],
  name: "watcher",
} as const satisfies Namespace
