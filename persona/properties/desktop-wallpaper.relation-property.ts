import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const desktopWallpaper = {
  id: "01a0c61d-e778-7592-a6cf-ae6833953348",
  type: "page-type/relation-property",
  slug: "desktop-wallpaper",
  propertySlug: "desktop-wallpaper",
  definition: "the picture a persona is shown as on Alan's monitor",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona's desktop wallpaper is an image, cut from one of her wallpapers for the monitor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whatever sets Alan's monitor reads this property rather than a path under his pictures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rung a picture was made for is kept on the image page rather than here.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
