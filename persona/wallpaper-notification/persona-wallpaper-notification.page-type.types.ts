import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { RelationshipLevel } from "akasha/persona/closeness-level/properties/relationship-level.relation-property.types.ts"
import type { NotificationPersona } from "akasha/persona/wallpaper-notification/properties/notification-persona.relation-property.types.ts"

export type PersonaWallpaperNotification = Page & {
  title: Title
  persona: NotificationPersona
  relationshipLevel: RelationshipLevel
}
