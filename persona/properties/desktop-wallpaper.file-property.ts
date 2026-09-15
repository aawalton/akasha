import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const desktopWallpaper = {
  id: "01a07861-ccaa-7c89-8461-ecbc1ac81264",
  type: "page-type/file-property",
  slug: "desktop-wallpaper",
  propertySlug: "desktop-wallpaper",
  definition: "the picture a persona is shown as on Alan's monitor",
  extensions: ["png"],
  generated: true,
  runsFileLength: false,
  holdsBytes: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's desktop wallpaper is a file beside that persona's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whatever sets Alan's monitor reads this property rather than a path under his pictures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A desktop wallpaper is shaped for the monitor Alan works at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rung a picture was made for is kept on the persona wallpaper page rather than here.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A workstation service sets the monitor from this property.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
