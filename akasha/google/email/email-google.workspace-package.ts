import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const emailGoogle = {
  id: "01a05c0e-372c-7620-9bcc-082febbe3f5b",
  pageTypeSlug: "workspace-package",
  slug: "email-google",
  definition: "Alan's Gmail mailbox read, written to and kept in order",
  manifest: "json",
  partSlugs: [
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
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A message is reached by the id Gmail gives the message rather than by its Message-ID header.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what becomes of a message that arrives.",
    },
  ],
} as const satisfies WorkspacePackage
