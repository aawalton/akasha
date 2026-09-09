import type { FileProperty } from "@akasha/pages/file-property"

export type DesktopWallpaper = "png"

export const desktopWallpaper = {
  id: "01a07861-ccaa-7c89-8461-ecbc1ac81264",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "desktop-wallpaper",
  propertySlug: "desktop-wallpaper",
  definition: "the picture a persona is shown as on Alan's monitor",
  generated: true,
  runsFileLength: false,
  holdsBytes: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona's desktop wallpaper is a file beside that persona's page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whatever sets Alan's monitor reads this property rather than a path under his pictures.",
    },
    {
      invariantKind: "departure",
      statement: "A desktop wallpaper is shaped for the monitor Alan works at.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rung a picture was made for is kept on the persona wallpaper page rather than here.",
    },
    {
      invariantKind: "gap",
      statement: "A workstation service sets the monitor from this property.",
    },
  ],
} as const satisfies FileProperty
