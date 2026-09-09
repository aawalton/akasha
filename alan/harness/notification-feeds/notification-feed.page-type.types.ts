import type { Page } from "../../../pages/page.page-type.ts"
import type { Person } from "../../../seat-system/seats/properties/person.relation-property.ts"
import type { Notifications } from "./properties/notifications.page-property-entry.ts"

export type NotificationFeed = Page & {
  person: Person
  notifications: Notifications
}
