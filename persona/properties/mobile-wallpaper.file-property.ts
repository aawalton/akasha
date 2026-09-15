import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const mobileWallpaper = {
  id: "01a0782e-1f17-71d7-90a2-279f0591ec44",
  type: "file-property",
  slug: "mobile-wallpaper",
  propertySlug: "mobile-wallpaper",
  definition: "the picture a persona is shown as on Alan's phone",
  extensions: ["png"],
  generated: true,
  runsFileLength: false,
  holdsBytes: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona's mobile wallpaper is a file beside that persona's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The route serving Alan's phone reads this property rather than a persona's cover.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A persona's mobile wallpaper is shaped for a phone screen.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement:
        "A mobile wallpaper has a persona's cover picture until a picture is drawn for a phone.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
