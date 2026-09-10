import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const imessage = {
  id: "01a07962-b0fa-7141-ae89-2d50447947d2",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "imessage",
  definition: "Alan's messages on iMessage",
  parts: [
    "command/imessage-contacts",
    "command/imessage-recent",
    "command/imessage-search",
    "command/imessage-send",
    "command/imessage-unread-list",
  ],
} as const satisfies Namespace
