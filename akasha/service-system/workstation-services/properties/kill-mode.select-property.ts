import type { SelectProperty } from "@akasha/pages-system/select-property"

export const killMode = {
  id: "01a06738-9f12-72be-a840-02aab4c10e93",
  pageTypeSlug: "select-property",
  slug: "kill-mode",
  propertySlug: "kill-mode",
  definition: "which processes are killed when a unit is stopped",
  values: ["control-group", "mixed", "process", "none"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit stating `none` leaves the processes to the commands the unit runs.",
    },
  ],
} as const satisfies SelectProperty

export type KillMode = (typeof killMode.values)[number]
