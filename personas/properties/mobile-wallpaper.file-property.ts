import type { FileProperty } from "@akasha/pages/file-property"

export type MobileWallpaper = "png"

export const mobileWallpaper = {
  id: "01a0782e-1f17-71d7-90a2-279f0591ec44",
  pageTypeSlug: "file-property",
  slug: "mobile-wallpaper",
  propertySlug: "mobile-wallpaper",
  definition: "the picture a persona is shown as on Alan's phone",
  generated: true,
  runsFileLength: false,
  holdsBytes: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona's mobile wallpaper is a file beside that persona's page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The route serving Alan's phone reads this property rather than a persona's cover.",
    },
    {
      invariantKind: "gap",
      statement: "A persona's mobile wallpaper is shaped for a phone screen.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "A mobile wallpaper has a persona's cover picture until a picture is drawn for a phone.",
    },
  ],
} as const satisfies FileProperty
