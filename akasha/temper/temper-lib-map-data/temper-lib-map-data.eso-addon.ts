import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperLibMapData = {
  id: "01a061e1-aeb3-7996-87d0-fffa6b5d33b6",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-map-data",
  definition: "which map, zone and floor the player is on, and where that falls on Tamriel",
  manifest: "json",
  addonManifest: "json",
  partSlugs: ["module/map-data-constants", "module/map-data-types", "module/map-data-casts"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the player is is worked out once per map change rather than on every ask.",
    },
    {
      invariantKind: "departure",
      statement: "A map is named by tile texture as well as by id.",
    },
    {
      invariantKind: "departure",
      statement: "The lookups from name back to id are built as the game loads the library.",
    },
    {
      invariantKind: "departure",
      statement: "An add-on hears about a zone change through a callback rather than by asking.",
    },
    {
      invariantKind: "constraint",
      statement: "The zone rows are what upstream LibMapData v1.21 states.",
    },
    {
      invariantKind: "constraint",
      statement: "This library needs LibGPS loaded first.",
    },
  ],
} as const satisfies EsoAddon
