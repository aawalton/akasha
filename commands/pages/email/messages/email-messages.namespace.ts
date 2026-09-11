import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const emailMessages = {
  id: "01a07bbf-258e-734c-970f-75a18de63e76",
  type: "namespace",
  slug: "email-messages",
  definition: "a message in Alan's mailbox",
  parts: [
    "command/email-messages-archive",
    "command/email-messages-get",
    "command/email-messages-list",
    "command/email-messages-modify-labels",
    "command/email-messages-send",
    "command/email-messages-trash",
  ],
} as const satisfies Namespace
