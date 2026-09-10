import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { MessageBody } from "./properties/message-body.text-property.ts"
import type { MessageClaimedAt } from "./properties/message-claimed-at.instant-property.ts"
import type { MessageFrom } from "./properties/message-from.text-property.ts"
import type { MessageTo } from "./properties/message-to.relation-property.ts"
import type { MessageWarrant } from "./properties/message-warrant.select-property.ts"

export type Message = Page & {
  to: MessageTo
  from: MessageFrom
  warrant: MessageWarrant
  body: MessageBody
  claimedAt?: MessageClaimedAt
}

export const message = {
  id: "01a06818-107b-7005-8e69-8cefb68f3cdf",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "message",
  definition: "text sent to somebody",
  pluralSlug: "messages",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "instant-property/message-claimed-at",
    "relation-property/message-to",
    "select-property/message-warrant",
    "text-property/message-body",
    "text-property/message-from",
  ],
  properties: [
    { pageProperty: "relation-property/message-to", required: true, many: false },
    { pageProperty: "text-property/message-from", required: true, many: false },
    {
      pageProperty: "select-property/message-warrant",
      required: true,
      many: false,
      default: "announce",
    },
    { pageProperty: "text-property/message-body", required: true, many: false },
    {
      pageProperty: "instant-property/message-claimed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message accepted is a file written rather than a message arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A message lands the same way whatever the recipient is doing.",
    },
    {
      invariantKind: "departure",
      statement: "Sending and claiming and reading are three separate acts.",
    },
    {
      invariantKind: "departure",
      statement: "A message read is that message's file gone.",
    },
    {
      invariantKind: "departure",
      statement: "A message waits on its file rather than failing at its sender.",
    },
    {
      invariantKind: "departure",
      statement: "A message starts the seat that message reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A message claimed and left is claimed again once the claim is let go.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message is named for the last twelve hex of its identity rather than for that message's words.",
    },
    {
      invariantKind: "departure",
      statement: "A message is named as that message is written.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing readable about a message is known when that message is named.",
    },
    {
      invariantKind: "gap",
      statement: "The messages waiting exist as pages under this type rather than as markdown.",
    },
  ],
} as const satisfies PageType
