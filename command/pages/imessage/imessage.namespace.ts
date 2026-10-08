import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const imessage = {
  id: "01a07962-b0fa-7141-ae89-2d50447947d2",
  type: "page-type/namespace",
  slug: "imessage",
  definition: "Alan's messages on iMessage",
  parts: [
    "command/imessage-contact-list",
    "command/imessage-recent-list",
    "command/imessage-search",
    "command/imessage-send",
    "command/imessage-unread-list",
  ],
  name: "imessage",
  createdAt: "2026-09-07T01:01:46.106Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
