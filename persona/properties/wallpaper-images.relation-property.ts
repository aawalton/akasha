import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const wallpaperImages = {
  id: "01a0c5ea-7c84-7389-9d04-e2eab5c35196",
  type: "page-type/relation-property",
  slug: "wallpaper-images",
  propertySlug: "wallpapers",
  definition: "the pictures a persona was hung on Alan's glass as",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A wallpaper states on its own page the rung and the ESO day it was made for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The desktop and mobile wallpapers a persona names are cut from one of these pictures.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
