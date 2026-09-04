import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { PersonSlug } from "../../../seat-system/seats/properties/person-slug.relation-property.ts"
import type { Notifications } from "./properties/notifications.page-property-entry.ts"

export type NotificationFeed = Page & {
  personSlug: PersonSlug
  notifications: Notifications
}

export const notificationFeed = {
  id: "01a06861-e7cd-7f8b-a674-034ea5efe956",
  pageTypeSlug: "page-type",
  slug: "notification-feed",
  definition: "everything this system has pushed at one person",
  pluralSlug: "notification-feeds",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "instant-property/notification-read-at",
    "instant-property/notification-sent-at",
    "page-property-entry/notifications",
    "text-property/notification-body",
    "text-property/notification-kind",
    "text-property/notification-link",
    "text-property/notification-source",
  ],
  properties: [
    { pagePropertySlug: "person-slug", required: true, many: false },
    { pagePropertySlug: "notifications", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A feed stands in a place of its own rather than beside the person's page.",
    },
    {
      invariantKind: "departure",
      statement: "One person has one feed, whatever pushed at them.",
    },
    {
      invariantKind: "departure",
      statement: "A feed's slug is the slug of the person whose feed it is.",
    },
    {
      invariantKind: "gap",
      statement: "The feeds stand as pages under this type rather than as markdown.",
    },
  ],
} as const satisfies PageType
