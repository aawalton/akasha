import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibTreasure = {
  id: "01a061d5-d0c3-7a12-a5dc-1ab43add5958",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-treasure",
  definition: "where every treasure map, survey report and clue is buried",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "treasure-main",
  partSlugs: [
    "module/treasure-constants",
    "module/treasure-types",
    "module/treasure-casts",
    "module/treasure-icons",
    "module/treasure-book-ids",
    "module/treasure-pins-data-00",
    "module/treasure-pins-data-01",
    "module/treasure-pins-data-02",
    "module/treasure-pins-data-03",
    "module/treasure-pins-data",
    "module/treasure-build-data",
    "module/treasure-lib-state",
    "module/treasure-api",
    "module/treasure-public-api",
    "module/treasure-main",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pin is placed by where the pin falls on its own map rather than on the world.",
    },
    {
      invariantKind: "departure",
      statement: "Every lookup is built once as the library loads.",
    },
    {
      invariantKind: "departure",
      statement: "An addon adds an icon to the shared list rather than keeping a separate list.",
    },
    {
      invariantKind: "constraint",
      statement: "The pin rows are what upstream LibTreasure v24 states.",
    },
  ],
} as const satisfies EsoAddon
