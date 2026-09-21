import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const mobileWallpaper = {
  id: "01a0c61d-f8be-7dee-97dc-2a9bb1313d4f",
  type: "page-type/relation-property",
  slug: "mobile-wallpaper",
  propertySlug: "mobile-wallpaper",
  definition: "the picture a persona is shown as on Alan's phone",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona's mobile wallpaper is an image, cut from one of her wallpapers for a phone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The route serving Alan's phone reads this property rather than a persona's cover.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A mobile wallpaper is a persona's cover picture until a picture is drawn for a phone.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
