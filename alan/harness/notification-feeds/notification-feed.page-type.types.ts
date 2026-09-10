import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Person } from "../../../seat-system/seats/properties/person.relation-property.ts"
import type { Notifications } from "./properties/notifications.page-property-entry.types.ts"

export type NotificationFeed = Page & {
  person: Person
  notifications?: Notifications
}
