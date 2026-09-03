import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type EmailMessage = Page

export const emailMessage = {
  id: "01a06828-59d3-79b5-a23b-24604d220bf0",
  pageTypeSlug: "page-type",
  slug: "email-message",
  definition: "one piece of mail in a person's account",
  pluralSlug: "email-messages",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is what an email rule is matched against.",
    },
    {
      invariantKind: "departure",
      statement: "A message belongs to the one account it arrived in.",
    },
    {
      invariantKind: "absence",
      statement: "No message is written to a file of its own; the account holds it.",
    },
    {
      invariantKind: "gap",
      statement:
        "Who a message is from and to, its subject and the list it came through are yet to stand as properties.",
    },
  ],
} as const satisfies PageType
