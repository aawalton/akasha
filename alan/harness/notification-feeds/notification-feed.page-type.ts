import type { PageType } from "@akasha/pages/page-type"

export const notificationFeed = {
  id: "01a06861-e7cd-7f8b-a674-034ea5efe956",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "notification-feed",
  definition: "everything this system has pushed at one person",
  pluralSlug: "notification-feeds",
  extends: ["page-type/page"],
  parts: [
    "instant-property/notification-read-at",
    "instant-property/notification-sent-at",
    "page-property-entry/notifications",
    "text-property/notification-body",
    "text-property/notification-kind",
    "text-property/notification-link",
    "text-property/notification-source",
    "module/notifying",
    "module/notification-feed-rows",
  ],
  properties: [
    { pageProperty: "relation-property/person", required: true, many: false },
    {
      pageProperty: "page-property-entry/notifications",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A feed sits in a place of its own rather than beside the person's page.",
    },
    {
      invariantKind: "departure",
      statement: "One person has one feed whatever pushed at that person.",
    },
    {
      invariantKind: "departure",
      statement: "A feed's slug is the slug of the person whose feed that feed is.",
    },
    {
      invariantKind: "gap",
      statement: "The feeds are pages under this type rather than markdown.",
    },
  ],
  types: "ts",
} as const satisfies PageType
