import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const emailMessage = {
  id: "01a07bbf-258e-734c-970f-75a18de63e76",
  type: "page-type/namespace",
  slug: "email-message",
  definition: "a message in Alan's mailbox",
  parts: [
    "command/email-message-archive",
    "command/email-message-list",
    "command/email-message-modify-label",
    "command/email-message-send",
    "command/email-message-show",
    "command/email-message-trash",
  ],
  name: "message",
  createdAt: "2026-09-07T12:01:59.694Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
