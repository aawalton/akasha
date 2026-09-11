import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { RelationshipLevel } from "akasha/personas/closeness-levels/properties/relationship-level.number-property.types.ts"
import type { NotificationPersona } from "akasha/personas/wallpaper-notifications/properties/notification-persona.relation-property.types.ts"

export type PersonaWallpaperNotification = Page & {
  title: Title
  persona: NotificationPersona
  relationshipLevel: RelationshipLevel
}
