import type { Person } from "akasha/agent/seat/properties/person.relation-property.types.ts"
import type { Notifications } from "akasha/alan/harness/notification-feed/properties/notifications.page-property-entry.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type NotificationFeed = Page & {
  person: Person
  notifications?: Notifications
}
