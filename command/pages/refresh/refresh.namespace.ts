import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const refresh = {
  id: "01a08209-80a1-7e1a-9c9e-2adeb0bbc194",
  type: "page-type/namespace",
  slug: "refresh",
  definition: "what a page carries, worked out again from where it came",
  parts: ["command/refresh-message", "command/refresh-persona"],
  name: "refresh",
  createdAt: "2026-09-08T17:20:55.969Z",
  updatedAt: "2026-09-21T15:57:11.000Z",
} as const satisfies Namespace
