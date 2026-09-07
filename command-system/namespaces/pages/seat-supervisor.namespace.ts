import type { Namespace } from "../namespace.page-type.ts"

export const seatSupervisor = {
  id: "01a0797a-9a21-7274-b0a9-16a707e7c032",
  pageTypeSlug: "namespace",
  slug: "seat-supervisor",
  definition: "the process running a seat",
  partSlugs: ["command/seat-supervisor-restart", "command/seat-supervisor-stop"],
} as const satisfies Namespace
