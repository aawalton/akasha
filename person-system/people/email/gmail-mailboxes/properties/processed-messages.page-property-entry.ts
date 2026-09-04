import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type ProcessedMessages = "jsonl"

export const processedMessages = {
  id: "01a06862-a0bc-72d6-b90f-dad9388f4920",
  pageTypeSlug: "page-property-entry",
  slug: "processed-messages",
  propertySlug: "processed-messages",
  definition: "every message a mailbox has been through and what was settled, one to a line",
  partSlugs: [
    "instant-property/gmail-processed-at",
    "text-property/gmail-decision",
    "text-property/gmail-message-id",
  ],
  properties: [
    { pagePropertySlug: "seq", required: true, many: false },
    { pagePropertySlug: "slug", required: true, many: false },
    { pagePropertySlug: "gmail-decision", required: true, many: false },
    { pagePropertySlug: "gmail-message-id", required: true, many: false },
    { pagePropertySlug: "gmail-processed-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is written here once what to do about it is settled.",
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
      invariantKind: "departure",
      statement: "An entry is slugged by the id Gmail gives the message.",
    },
  ],
} as const satisfies PagePropertyEntry
