import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonWorldMapData = {
  id: "01a0c722-6743-7fee-8cb3-c9e00f498448",
  type: "page-type/domain",
  slug: "temper-addon-world-map-data",
  definition: "which map, zone and floor the player is on, and where that falls on Tamriel",
  parts: [
    "module/map-data-build-tables",
    "module/map-data-casts",
    "module/map-data-constants",
    "module/map-data-events",
    "module/map-data-index",
    "module/map-data-index-00",
    "module/map-data-index-01",
    "module/map-data-index-02",
    "module/map-data-index-03",
    "module/map-data-lib-state",
    "module/map-data-logger",
    "module/map-data-main",
    "module/map-data-pseudo-indices",
    "module/map-data-public-api",
    "module/map-data-queries",
    "module/map-data-table",
    "module/map-data-types",
    "module/map-data-update",
    "module/map-data-zones-00",
    "module/map-data-zones-01",
    "module/map-data-zones-02",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the player is is worked out once per map change rather than on every ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A map is named by tile texture as well as by id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lookups from name back to id are built as the add-on loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This feature starts before every feature reading what it works out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature reads where the player is by importing this feature's state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This feature fires a callback of its own for each change it sees.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The zone rows are the rows upstream map-data v1.21 states.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Placing the player on Tamriel needs the map measuring feature started first.",
    },
  ],
} as const satisfies Domain
