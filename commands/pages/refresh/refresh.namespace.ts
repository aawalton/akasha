import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const refresh = {
  id: "01a08209-80a1-7e1a-9c9e-2adeb0bbc194",
  pageTypeSlug: "namespace",
  slug: "refresh",
  definition: "what a page carries, worked out again from where it came",
  parts: ["command/refresh-attributes", "command/refresh-messages", "command/refresh-personas"],
} as const satisfies Namespace
