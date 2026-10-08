import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const generated = {
  id: "01a06d4d-c32a-73c2-8814-5b8f1754297f",
  type: "page-type/boolean-property",
  slug: "generated",
  propertySlug: "generated",
  definition: "whether a machine rather than an author writes the files a property has",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying nothing here holds the files an author writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No author writes such a file by hand.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the machine that writes the file.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T16:43:27.914Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies BooleanProperty
