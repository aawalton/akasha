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
} as const satisfies SelectProperty
