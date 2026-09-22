import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonWorldGps = {
  id: "01a0c73e-7d6a-7946-97db-4f5039b65470",
  type: "page-type/domain",
  slug: "temper-addon-world-gps",
  definition: "a map's coordinates carried onto Tamriel's and onto the world's",
  parts: [
    "module/gps-api",
    "module/gps-casts",
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
      decisionKind: "decision-kind/departure",
      statement: "This feature starts before every feature reading what it measures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature reads a measurement by importing this feature's public names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "LibDebugLogger and TemperChatMessage are loaded before this feature.",
    },
  ],
} as const satisfies Domain
