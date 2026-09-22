import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonWorldMapPins = {
  id: "01a0c768-8aa3-7d26-8f82-0b04f321f4f5",
  type: "page-type/domain",
  slug: "temper-addon-world-map-pins",
  definition:
    "the way every other feature puts its own pins and filter checkboxes on the game's world map",
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
      statement: "A custom pin type is handed to the game's own world map pin manager.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin type another feature adds is reached by its name or by its number.",
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
      statement: "The gamepad filter list is rebuilt from the entries this feature has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature adds a pin by importing this feature's public object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This feature starts before every feature drawing a pin through it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pin sets Temper draws are each their own feature, and this one draws none of them.",
    },
  ],
} as const satisfies Domain
