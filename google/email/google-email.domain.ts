import type { Domain } from "../../domains/domain.page-type.ts"

export const googleEmail = {
  id: "01a05c0e-372c-7620-9bcc-082febbe3f5b",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "google-email",
  definition: "Alan's Gmail mailbox read, written to and kept in order",
  parts: [
    "module/gmail-credentials",
    "module/gmail-auth",
    "module/gmail-client",
    "module/email-shapes",
    "module/mime-message",
    "module/gmail-schema",
    "module/gmail-messages",
    "module/gmail-drafts",
    "module/gmail-attachments",
    "module/gmail-history",
    "module/list-unsubscribe",
    "module/gmail-inbound-adapter",
    "module/gmail-mailbox",
    "module/forwarded-message",
    "module/email-operations",
    "module/email-message-fetching",
    "module/compose-input-from-arguments",
    "module/email-command-reading",
    "module/email-command-help",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A message is reached by the id Gmail gives the message rather than by its Message-ID header.",
    },
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides the fate of a message that arrives.",
    },
  ],
} as const satisfies Domain
