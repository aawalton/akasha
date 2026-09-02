import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperNavigationAddon = {
  id: "01a06269-2b19-7da5-9012-2ba4d1bba677",
  pageTypeSlug: "eso-addon",
  slug: "temper-navigation-addon",
  definition:
    "the add-on that pins the world map and the compass and keeps a minimap on the screen",
  manifest: "json",
  addonManifest: "json",
  partSlugs: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The four old add-ons are one add-on here.",
    },
    {
      invariantKind: "departure",
      statement: "The compass pin library is published as CustomCompassPins.",
    },
    {
      invariantKind: "departure",
      statement: "A saved variable keeps the name the old add-on wrote under.",
    },
    {
      invariantKind: "departure",
      statement: "A data table wider than one module is runs joined in order.",
    },
    {
      invariantKind: "departure",
      statement: "The XML document loads before the Lua bundle.",
    },
  ],
} as const satisfies EsoAddon
