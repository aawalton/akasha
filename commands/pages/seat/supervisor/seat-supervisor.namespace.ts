import type { Namespace } from "../../../namespaces/namespace.page-type.types.ts"

export const seatSupervisor = {
  id: "01a0797a-9a21-7274-b0a9-16a707e7c032",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "seat-supervisor",
  definition: "the process running a seat",
  parts: ["command/seat-supervisor-restart", "command/seat-supervisor-stop"],
} as const satisfies Namespace
