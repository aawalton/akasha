import type { Namespace } from "../namespace.page-type.ts"

export const emailMessages = {
  id: "01a07bbf-258e-734c-970f-75a18de63e76",
  pageTypeSlug: "namespace",
  slug: "email-messages",
  definition: "a message in Alan's mailbox",
  partSlugs: [
    "command/email-messages-archive",
    "command/email-messages-get",
    "command/email-messages-list",
    "command/email-messages-modify-labels",
    "command/email-messages-send",
    "command/email-messages-trash",
  ],
} as const satisfies Namespace
