import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const track = {
  id: "01a07979-7d2b-70bb-babc-f9bd625aca32",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "track",
  definition: "what one of Alan's days held, written down",
  parts: ["namespace/track-session", "command/track-health-import", "command/track-weight"],
} as const satisfies Namespace
