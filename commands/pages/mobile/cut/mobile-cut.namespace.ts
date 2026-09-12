import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const mobileCut = {
  id: "01a07bc2-afbe-7d91-9425-8903598cf067",
  type: "namespace",
  slug: "mobile-cut",
  definition: "the commit a TestFlight build was taken from",
  parts: ["command/mobile-cut-record", "command/mobile-cut-status"],
  name: "cut",
} as const satisfies Namespace
