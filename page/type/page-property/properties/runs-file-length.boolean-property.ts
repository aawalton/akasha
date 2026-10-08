import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const runsFileLength = {
  id: "01a06cd9-428f-7ffc-bd74-e4f412d578cd",
  type: "page-type/boolean-property",
  slug: "runs-file-length",
  propertySlug: "runs-file-length",
  definition: "whether the byte ceiling is judged over the files a property has",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying nothing here is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No file of a property saying false is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property exempts every file that property has rather than one file named here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T14:36:12.815Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies BooleanProperty
