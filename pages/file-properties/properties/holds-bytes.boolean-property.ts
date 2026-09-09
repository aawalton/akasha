import type { BooleanProperty } from "@akasha/pages/boolean-property"

export type HoldsBytes = boolean

export const holdsBytes = {
  id: "01a0783e-bc03-787d-b886-e4476954adbe",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "holds-bytes",
  propertySlug: "holds-bytes",
  definition: "whether the files a property has are bytes rather than text",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property saying nothing here has text.",
    },
    {
      invariantKind: "departure",
      statement: "A property holding bytes is answered as the bytes on disk rather than as text.",
    },
    {
      invariantKind: "departure",
      statement: "A property exempts every file that property has rather than one file named here.",
    },
  ],
} as const satisfies BooleanProperty
