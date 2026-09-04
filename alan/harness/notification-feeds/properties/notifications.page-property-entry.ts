import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Notifications = "jsonl"

export const notifications = {
  id: "019f4a1f-0ecc-7d45-8f43-7b424b5f0477",
  pageTypeSlug: "page-property-entry",
  slug: "notifications",
  propertySlug: "notifications",
  definition: "something pushed at a person rather than waiting for them to look",
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "notification-body", required: false, many: false },
    { pagePropertySlug: "notification-link", required: false, many: false },
    { pagePropertySlug: "notification-kind", required: false, many: false },
    { pagePropertySlug: "notification-source", required: false, many: false },
    { pagePropertySlug: "notification-sent-at", required: true, many: false },
    { pagePropertySlug: "notification-read-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A notification stands in the feed of the person it was pushed at rather than in a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Notifications stand in the order they were pushed, oldest first.",
    },
    {
      invariantKind: "absence",
      statement: "No setting says which notifications reach a person.",
    },
    {
      invariantKind: "departure",
      statement: "The filters on the unread view are the settings.",
    },
    {
      invariantKind: "departure",
      statement: "A notification carrying no instant it was read at is unread.",
    },
    {
      invariantKind: "departure",
      statement: "Every notification deep-links to itself.",
    },
  ],
} as const satisfies PagePropertyEntry
