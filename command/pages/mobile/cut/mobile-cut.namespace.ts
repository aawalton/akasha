import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const mobileCut = {
  id: "01a07bc2-afbe-7d91-9425-8903598cf067",
  type: "page-type/namespace",
  slug: "mobile-cut",
  definition: "a TestFlight build's commit",
  parts: ["command/mobile-cut-record", "command/mobile-cut-status"],
  name: "cut",
  createdAt: "2026-09-07T12:05:51.678Z",
  updatedAt: "2026-09-22T13:44:00.000Z",
} as const satisfies Namespace
