import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Notifications = "jsonl"

export const notifications = {
  id: "019f4a1f-0ecc-7d45-8f43-7b424b5f0477",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "notifications",
  propertySlug: "notifications",
  definition: "something pushed at a person rather than waiting for them to look",
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/notification-body", required: false, many: false },
    { pageProperty: "text-property/notification-link", required: false, many: false },
    { pageProperty: "text-property/notification-kind", required: false, many: false },
    { pageProperty: "text-property/notification-source", required: false, many: false },
    { pageProperty: "instant-property/notification-sent-at", required: true, many: false },
    { pageProperty: "instant-property/notification-read-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A notification pushed at a person sits in that person's feed rather than in a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Notifications sit in the order those notifications were pushed.",
    },
    {
      invariantKind: "departure",
      statement: "The oldest notification sits first.",
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
      statement: "A notification with no instant that notification was read at is unread.",
    },
    {
      invariantKind: "departure",
      statement: "Every notification deep-links to itself.",
    },
  ],
} as const satisfies PagePropertyEntry
