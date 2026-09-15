import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const readoutEnabled = {
  id: "01a063bd-a526-7356-a7bd-00f589dcdc18",
  type: "page-type/boolean-property",
  slug: "readout-enabled",
  propertySlug: "enabled",
  definition: "whether anything draws a reading",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating false keeps a page and leaves the strip.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stilled readout is no member of the groups the readout names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating nothing is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service has a separate property of the same key.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
