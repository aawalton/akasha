import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const seatSupervisor = {
  id: "01a0797a-9a21-7274-b0a9-16a707e7c032",
  type: "page-type/namespace",
  slug: "seat-supervisor",
  definition: "the process running a seat",
  parts: ["command/seat-supervisor-restart", "command/seat-supervisor-stop"],
  name: "supervisor",
  createdAt: "2026-09-07T01:27:53.121Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
