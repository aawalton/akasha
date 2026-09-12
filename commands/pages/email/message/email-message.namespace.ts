import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const emailMessage = {
  id: "01a07bbf-258e-734c-970f-75a18de63e76",
  type: "namespace",
  slug: "email-message",
  definition: "a message in Alan's mailbox",
  parts: [
    "command/email-message-archive",
    "command/email-message-show",
    "command/email-message-list",
    "command/email-message-modify-labels",
    "command/email-message-send",
    "command/email-message-trash",
  ],
} as const satisfies Namespace
