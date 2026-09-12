import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const track = {
  id: "01a07979-7d2b-70bb-babc-f9bd625aca32",
  type: "namespace",
  slug: "track",
  definition: "what one of Alan's days held, written down",
  parts: [
    "namespace/track-session",
    "command/track-health-import",
    "command/track-weight",
    "module/session-rows",
    "module/session-leveling",
    "module/waking",
  ],
  name: "track",
} as const satisfies Namespace
