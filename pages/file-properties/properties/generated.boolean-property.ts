import type { BooleanProperty } from "@akasha/pages/boolean-property"

export type Generated = boolean

export const generated = {
  id: "01a06d4d-c32a-73c2-8814-5b8f1754297f",
  pageTypeSlug: "boolean-property",
  slug: "generated",
  propertySlug: "generated",
  definition: "whether a machine rather than an author writes the files a property has",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property saying nothing here holds the files an author writes.",
    },
    {
      invariantKind: "departure",
      statement: "No author writes such a file by hand.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the machine that writes the file.",
    },
  ],
} as const satisfies BooleanProperty
