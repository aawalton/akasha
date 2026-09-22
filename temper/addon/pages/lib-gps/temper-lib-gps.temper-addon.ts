import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperLibGps = {
  id: "01a0614d-4767-7eb4-a5d6-68581039bf67",
  type: "page-type/temper-addon",
  slug: "temper-lib-gps",
  definition: "one map's coordinates carried onto Tamriel's and onto the world's",

  addonManifest: "json",
  bundleEntry: "module/gps-main",
  parts: [
    "module/gps-api",
    "module/gps-casts",
    "module/gps-compatibility",
    "module/gps-constants",
    "module/gps-initialization",
    "module/gps-lib-state",
    "module/gps-main",
    "module/gps-map-adapter",
    "module/gps-map-stack",
    "module/gps-measurement",
    "module/gps-public-api",
    "module/gps-tamriel-o-meter",
    "module/gps-types",
    "module/gps-world-size",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every map is measured against Tamriel rather than against its parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A map is measured the first time the map is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A measurement taken for a map is kept for as long as the game runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own map changing functions are wrapped rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A map outside Tamriel is measured against a root map of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This library needs LibMapPing loaded first.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This library needs LibDebugLogger loaded first.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This library needs the Temper add-on loaded first.",
    },
  ],
  library: true,
} as const satisfies TemperAddon
