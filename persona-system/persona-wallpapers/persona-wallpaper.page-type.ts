import type { PageType } from "@akasha/pages-system/page-type"
import type { EsoDay } from "../../alan/tracking/daily/eso-days/properties/eso-day.text-property.ts"
import type { Description } from "../../pages/properties/description.text-property.ts"
import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"
import type { Stage } from "../closeness-levels/properties/stage.text-property.ts"
import type { PersonaImage } from "../persona-images/persona-image.page-type.ts"
import type { ValueSlug } from "../personas/properties/value-slug.text-property.ts"

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
  extendsSlug: ["page-type/persona-image"],
  properties: [
    { pagePropertySlug: "relationship-level", required: false, many: false },
    { pagePropertySlug: "stage", required: false, many: false },
    { pagePropertySlug: "eso-day", required: false, many: false },
    { pagePropertySlug: "description", required: false, many: false },
    { pagePropertySlug: "value-slug", required: false, many: false },
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
