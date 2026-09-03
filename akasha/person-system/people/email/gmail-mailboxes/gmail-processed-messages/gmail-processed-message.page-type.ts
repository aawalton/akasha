import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type GmailProcessedMessage = Page

export const gmailProcessedMessage = {
  id: "01a06828-59d3-71c7-a4fa-80753741787c",
  pageTypeSlug: "page-type",
  slug: "gmail-processed-message",
  definition: "one message a mailbox has been through, and what was decided about it",
  pluralSlug: "gmail-processed-messages",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is written here once it has been decided.",
    },
    {
      invariantKind: "departure",
      statement: "A second pass over the same mailbox skips a message already written here.",
    },
    {
      invariantKind: "departure",
      statement: "A processed message stands beside the mailbox it was read from.",
    },
    {
      invariantKind: "absence",
      statement: "A processed message stands in no row of its own.",
    },
    {
      invariantKind: "gap",
      statement:
        "What was decided, which message it was and when it was gone through are yet to stand as properties.",
    },
  ],
} as const satisfies PageType
