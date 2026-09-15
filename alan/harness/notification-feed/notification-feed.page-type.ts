import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const notificationFeed = {
  id: "01a06861-e7cd-7f8b-a674-034ea5efe956",
  type: "page-type",
  slug: "notification-feed",
  definition: "everything this system has pushed at one person",
  extends: ["page-type/page"],
  parts: [
    "instant-property/notification-read-at",
    "instant-property/notification-sent-at",
    "module/notification-feed-rows",
    "module/notifying",
    "page-property-entry/notifications",
    "text-property/notification-body",
    "text-property/notification-kind",
    "text-property/notification-link",
    "text-property/notification-source",
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
      invariantKind: "invariant-kind/departure",
      statement: "A feed sits in a place of its own rather than beside the person's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One person has one feed whatever pushed at that person.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A feed's slug is the slug of the person whose feed that feed is.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The feeds are pages under this type rather than markdown.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
