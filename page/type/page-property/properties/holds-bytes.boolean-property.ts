import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const holdsBytes = {
  id: "01a0783e-bc03-787d-b886-e4476954adbe",
  type: "page-type/boolean-property",
  slug: "holds-bytes",
  propertySlug: "holds-bytes",
  definition: "whether the files a property has are bytes rather than text",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying nothing here has text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property holding bytes is answered as the bytes on disk rather than as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property exempts every file that property has rather than one file named here.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
