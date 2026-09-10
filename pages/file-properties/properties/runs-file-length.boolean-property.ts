import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type RunsFileLength = boolean

export const runsFileLength = {
  id: "01a06cd9-428f-7ffc-bd74-e4f412d578cd",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "runs-file-length",
  propertySlug: "runs-file-length",
  definition: "whether the byte ceiling is judged over the files a property has",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property saying nothing here is judged.",
    },
    {
      invariantKind: "departure",
      statement: "No file of a property saying false is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A property exempts every file that property has rather than one file named here.",
    },
  ],
} as const satisfies BooleanProperty
