import type { PageType } from "@akasha/pages/page-type"
import type { Description } from "../../pages/properties/description.text-property.ts"
import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"
import type { Stage } from "../closeness-levels/properties/stage.text-property.ts"
import type { PersonaImage } from "../images/persona-image.page-type.ts"
import type { ValueSlug } from "../properties/value-slug.text-property.ts"
import type { EsoDay } from "./properties/eso-day.text-property.ts"

export type PersonaWallpaper = PersonaImage & {
  relationshipLevel?: RelationshipLevel
  stage?: Stage
  esoDay?: EsoDay
  description?: Description
  valueSlug?: ValueSlug
}

export const personaWallpaper = {
  id: "01a0655b-4a9b-700c-8243-c78f27e30dd7",
  pageTypeSlug: "page-type",
  slug: "persona-wallpaper",
  definition: "the picture a persona was hung on Alan's glass as",
  pluralSlug: "persona-wallpapers",
  extends: ["page-type/persona-image"],
  partSlugs: ["text-property/eso-day"],
  properties: [
    { pagePropertySlug: "number-property/relationship-level", required: false, many: false },
    { pagePropertySlug: "text-property/stage", required: false, many: false },
    { pagePropertySlug: "text-property/eso-day", required: false, many: false },
    { pagePropertySlug: "text-property/value-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wallpaper is matched by the persona and the rung together.",
    },
    {
      invariantKind: "departure",
      statement:
        "A wallpaper's slug joins the persona to the rung and to the moment of the drawing.",
    },
    {
      invariantKind: "departure",
      statement: "A description here is the persona's own words about her picture.",
    },
  ],
} as const satisfies PageType
