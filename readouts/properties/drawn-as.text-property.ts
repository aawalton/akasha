import type { TextProperty } from "@akasha/pages/text-property"

export type DrawnAs = "stoplight" | "number"

export const drawnAs = {
  id: "01a063bd-a526-78b3-ad87-dc9525cc297e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "drawn-as",
  propertySlug: "drawn-as",
  definition: "whether a reading is drawn as a stoplight or as a bare number",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
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
} as const satisfies TextProperty
