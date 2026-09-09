import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"
import type { NotificationPersona } from "./properties/notification-persona.relation-property.ts"

export type PersonaWallpaperNotification = Page & {
  title: Title
  persona: NotificationPersona
  relationshipLevel: RelationshipLevel
}

export const personaWallpaperNotification = {
  id: "01a0655b-4a9b-700d-88c0-5e1a49f13be5",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "persona-wallpaper-notification",
  definition: "word to Alan that a persona reached a rung and was hung there",
  pluralSlug: "persona-wallpaper-notifications",
  extends: ["page-type/page"],
  parts: ["relation-property/notification-persona"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "relation-property/notification-persona",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/relationship-level", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page being there is the whole record.",
    },
    {
      invariantKind: "departure",
      statement: "A persona is told of at a rung once.",
    },
    {
      invariantKind: "absence",
      statement: "No moment is kept of when the word went out.",
    },
  ],
} as const satisfies PageType
