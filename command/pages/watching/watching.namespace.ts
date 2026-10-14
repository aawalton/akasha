import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const watching = {
  id: "01a13bd7-c015-7bad-a2fd-cfd1730a7fd7",
  type: "page-type/namespace",
  slug: "watching",
  definition: "the shows and movies Alan watches, written down",
  parts: ["command/watching-log"],
  name: "watching",
  createdAt: "2026-10-14T19:15:57.587Z",
  updatedAt: "2026-10-14T19:15:57.587Z",
} as const satisfies Namespace
