import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Enabled = boolean

export const readoutEnabled = {
  id: "01a063bd-a526-7356-a7bd-00f589dcdc18",
  pageTypeSlug: "boolean-property",
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
      statement: "A service holds a separate property of the same key.",
    },
  ],
} as const satisfies BooleanProperty
