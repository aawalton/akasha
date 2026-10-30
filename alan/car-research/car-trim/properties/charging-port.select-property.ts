import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chargingPort = {
  id: "01a0c542-81ec-747d-9067-56887f802030",
  type: "page-type/select-property",
  slug: "charging-port",
  propertySlug: "charging-port",
  definition: "the kind of plug a car trim charges through",
  values: ["NACS", "CCS1", "J1772", "CHAdeMO", "none"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trim that takes no charge from outside states `none`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-21T18:37:45.324Z",
  updatedAt: "2026-10-30T15:00:45.529Z",
} as const satisfies SelectProperty
