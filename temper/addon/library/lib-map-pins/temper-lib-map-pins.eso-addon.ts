import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibMapPins = {
  id: "01a06062-57dc-7eeb-bb3d-6badd05f9bf5",
  type: "page-type/eso-addon",
  slug: "temper-lib-map-pins",
  definition: "an addon library adding custom pins and their filter checkboxes to the world map",

  addonManifest: "json",
  bundleEntry: "module/map-pins-main",
  parts: [
    "module/map-pins-casts",
    "module/map-pins-constants",
    "module/map-pins-debug",
    "module/map-pins-helpers",
    "module/map-pins-hooks",
    "module/map-pins-lib",
    "module/map-pins-main",
    "module/map-pins-public-api",
    "module/map-pins-types",
    "module/map-zone-and-subzone",
    "module/pin-filters",
    "module/pin-state",
    "module/pin-types",
    "type-declaration/map-pins-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A custom pin type is registered with the game's own world map pin manager.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A registered pin type is reached by its name or by its number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin type gets a checkbox on every map filter panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter checkbox reads and writes the saved variables the caller hands in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gamepad filter list is rebuilt from the entries this library has.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller reaches this library through a game global rather than an import.",
    },
  ],
} as const satisfies EsoAddon
