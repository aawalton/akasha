import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"
import type { NotificationPersona } from "./properties/notification-persona.relation-property.ts"

export type PersonaWallpaperNotification = Page & {
  title: Title
  persona: NotificationPersona
  relationshipLevel: RelationshipLevel
}
