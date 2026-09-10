import type { Namespace } from "../../../namespaces/namespace.page-type.types.ts"

export const trackSession = {
  id: "01a07979-7d78-7cc9-b390-00151a274e16",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "track-session",
  definition: "the stretches of time one of Alan's days is made of",
  parts: [
    "command/track-session-open",
    "command/track-session-switch",
    "command/track-session-close",
    "command/track-session-log",
    "command/track-session-amend",
    "command/track-session-drop",
    "command/track-session-split",
    "command/track-session-show",
    "command/track-session-file",
    "command/track-session-check",
  ],
} as const satisfies Namespace
