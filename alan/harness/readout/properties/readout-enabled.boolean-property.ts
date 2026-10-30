import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const readoutEnabled = {
  id: "01a063bd-a526-7356-a7bd-00f589dcdc18",
  type: "page-type/boolean-property",
  slug: "readout-enabled",
  propertySlug: "enabled",
  definition: "whether anything shows a readout",
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
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T16:11:24.267Z",
} as const satisfies BooleanProperty
