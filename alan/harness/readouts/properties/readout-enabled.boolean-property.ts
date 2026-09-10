import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type ReadoutEnabled = boolean

export const readoutEnabled = {
  id: "01a063bd-a526-7356-a7bd-00f589dcdc18",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "readout-enabled",
  propertySlug: "enabled",
  definition: "whether anything draws a reading",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout stating false keeps a page and leaves the strip.",
    },
    {
      invariantKind: "departure",
      statement: "A stilled readout is no member of the groups the readout names.",
    },
    {
      invariantKind: "departure",
      statement: "A readout stating nothing is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A service has a separate property of the same key.",
    },
  ],
} as const satisfies BooleanProperty
