import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibMapPins = {
  id: "01a06062-57dc-7eeb-bb3d-6badd05f9bf5",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-map-pins",
  definition: "an addon library adding custom pins and their filter checkboxes to the world map",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "map-pins-main",
  partSlugs: [
    "module/map-pins-casts",
    "module/map-pins-constants",
    "module/map-pins-types",
    "module/map-pins-helpers",
    "module/map-zone-and-subzone",
    "module/map-pins-debug",
    "module/pin-types",
    "module/pin-state",
    "module/pin-filters",
    "module/map-pins-lib",
    "module/map-pins-hooks",
    "module/map-pins-public-api",
    "module/map-pins-main",
    "type-declaration/map-pins-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A custom pin type is registered with the game's own world map pin manager.",
    },
    {
      invariantKind: "departure",
      statement: "A registered pin type is reached by its name or by its number.",
    },
    {
      invariantKind: "departure",
      statement: "A pin type gets a checkbox on every map filter panel.",
    },
    {
      invariantKind: "departure",
      statement: "A filter checkbox reads and writes the saved variables the caller hands in.",
    },
    {
      invariantKind: "departure",
      statement: "The gamepad filter list is rebuilt from the entries this library holds.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller reaches this library through a game global rather than an import.",
    },
  ],
} as const satisfies EsoAddon
