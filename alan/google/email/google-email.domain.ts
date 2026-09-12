import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const googleEmail = {
  id: "01a05c0e-372c-7620-9bcc-082febbe3f5b",
  type: "domain",
  slug: "google-email",
  definition: "Alan's Gmail mailbox read, written to and kept in order",
  parts: [
    "module/compose-input-from-arguments",
    "module/email-command-reading",
    "module/email-message-fetching",
    "module/email-operations",
    "module/email-shapes",
    "module/forwarded-message",
    "module/gmail-attachments",
    "module/gmail-auth",
    "module/gmail-client",
    "module/gmail-credentials",
    "module/gmail-drafts",
    "module/gmail-history",
    "module/gmail-inbound-adapter",
    "module/gmail-mailbox",
    "module/gmail-messages",
    "module/gmail-schema",
    "module/list-unsubscribe",
    "module/mime-message",
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
