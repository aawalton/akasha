import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Description } from "../../pages/properties/description.text-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { CharacterReadings } from "./properties/character-readings.page-property-entry.ts"
import type { MechanicReadings } from "./properties/mechanic-readings.page-property-entry.ts"

export type World = Page & {
  title: Title
  description?: Description
  characterReadings?: CharacterReadings
  mechanicReadings?: MechanicReadings
}

export const world = {
  id: "01a063ce-6216-7000-8f40-f471a7c21987",
  pageTypeSlug: "page-type",
  slug: "world",
  definition: "a made-up somewhere",
  pluralSlug: "worlds",
  extendsSlug: ["page-type/page"],
  runsTabooCheck: false,
  partSlugs: [
    "page-property-entry/character-readings",
    "page-property-entry/mechanic-readings",
    "text-property/character-slug",
    "text-property/mechanic-slug",
    "text-property/reading-kind",
    "text-property/reading-name",
    "text-property/reading-slug",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "description", required: false, many: false },
    { pagePropertySlug: "character-readings", required: false, many: false },
    { pagePropertySlug: "mechanic-readings", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A world states a reading property only where the world holds rows under that property.",
    },
    {
      invariantKind: "departure",
      statement: "A reading says what one name in the text reaches rather than what that thing is.",
    },
    {
      invariantKind: "departure",
      statement: "The words a world carries are the story's rather than akasha's own.",
    },
    {
      invariantKind: "gap",
      statement: "Every story names the world the story is of.",
    },
  ],
} as const satisfies PageType
