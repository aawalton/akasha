import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const track = {
  id: "01a07979-7d2b-70bb-babc-f9bd625aca32",
  type: "page-type/namespace",
  slug: "track",
  definition: "what one of Alan's days held, written down",
  parts: [
    "command/track-food",
    "command/track-health-import",
    "command/track-weight",
    "module/session-leveling",
    "module/session-rows",
    "module/waking",
    "namespace/track-session",
    "command/track-topic-words",
  ],
  name: "track",
} as const satisfies Namespace
