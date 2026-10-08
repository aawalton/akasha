import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chargingPort = {
  id: "01a0c542-81ec-747d-9067-56887f802030",
  type: "page-type/select-property",
  slug: "charging-port",
  propertySlug: "charging-port",
  definition: "a trim's charging plug",
  values: ["NACS", "CCS1", "J1772", "CHAdeMO", "none"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trim that takes no charge from outside states `none`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-21T18:37:45.324Z",
  updatedAt: "2026-09-22T13:42:40.000Z",
} as const satisfies SelectProperty
