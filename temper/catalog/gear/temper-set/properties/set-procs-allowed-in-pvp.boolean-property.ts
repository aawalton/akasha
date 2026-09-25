import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const setProcsAllowedInPvp = {
  id: "01a0d8e1-0ec0-77ec-b02a-9d8eb61692df",
  type: "page-type/boolean-property",
  slug: "set-procs-allowed-in-pvp",
  propertySlug: "set-procs-allowed-in-pvp",
  definition: "whether a set's proc still fires in player-versus-player areas",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set whose proc does not fire there states nothing rather than false.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
