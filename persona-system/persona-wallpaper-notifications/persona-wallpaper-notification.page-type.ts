import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { PersonaSlug } from "../../domain-system/initiatives/properties/persona-slug.relation-property.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"

export type PersonaWallpaperNotification = Page & {
  title: Title
  personaSlug: PersonaSlug
  relationshipLevel: RelationshipLevel
}

export const personaWallpaperNotification = {
  id: "01a0655b-4a9b-700d-88c0-5e1a49f13be5",
  pageTypeSlug: "page-type",
  slug: "persona-wallpaper-notification",
  definition: "word to Alan that a persona reached a rung and was hung there",
  pluralSlug: "persona-wallpaper-notifications",
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "persona-slug", required: true, many: false },
    { pagePropertySlug: "relationship-level", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page standing is the whole of what the page records.",
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
