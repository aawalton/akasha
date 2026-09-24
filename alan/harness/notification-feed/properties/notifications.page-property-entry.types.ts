import type { NotificationBody } from "akasha/alan/harness/notification-feed/properties/notification-body.text-property.types.ts"
import type { NotificationKind } from "akasha/alan/harness/notification-feed/properties/notification-kind.text-property.types.ts"
import type { NotificationLink } from "akasha/alan/harness/notification-feed/properties/notification-link.text-property.types.ts"
import type { NotificationReadAt } from "akasha/alan/harness/notification-feed/properties/notification-read-at.instant-property.types.ts"
import type { NotificationSentAt } from "akasha/alan/harness/notification-feed/properties/notification-sent-at.instant-property.types.ts"
import type { NotificationSource } from "akasha/alan/harness/notification-feed/properties/notification-source.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Notifications = "jsonl"

export type NotificationsRow = {
  id: Id
  title: Title
  body?: NotificationBody
  link?: NotificationLink
  kind?: NotificationKind
  source?: NotificationSource
  sentAt: NotificationSentAt
  readAt?: NotificationReadAt
}
