import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const drawnAs = {
  id: "01a063bd-a526-78b3-ad87-dc9525cc297e",
  type: "select-property",
  slug: "drawn-as",
  propertySlug: "drawn-as",
  definition: "whether a reading is drawn as a stoplight or as a bare number",
  values: ["stoplight", "number"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout stating nothing is drawn as a stoplight.",
    },
    {
      invariantKind: "departure",
      statement: "A reading drawn as a number is drawn without a rung behind the figure.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
