import type { Notifications } from "akasha/alan/harness/notification-feeds/properties/notifications.page-property-entry.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Person } from "akasha/seat-system/seats/properties/person.relation-property.types.ts"

export type NotificationFeed = Page & {
  person: Person
  notifications?: Notifications
}
