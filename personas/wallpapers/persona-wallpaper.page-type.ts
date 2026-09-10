import type { PageType } from "@akasha/pages/page-type"

export const personaWallpaper = {
  id: "01a0655b-4a9b-700c-8243-c78f27e30dd7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "persona-wallpaper",
  definition: "the picture a persona was hung on Alan's glass as",
  pluralSlug: "persona-wallpapers",
  extends: ["page-type/persona-image"],
  parts: ["text-property/eso-day"],
  properties: [
    { pageProperty: "number-property/relationship-level", required: false, many: false },
    { pageProperty: "text-property/stage", required: false, many: false },
    { pageProperty: "text-property/eso-day", required: false, many: false },
    { pageProperty: "text-property/value-slug", required: false, many: false },
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
  types: "ts",
} as const satisfies PageType
