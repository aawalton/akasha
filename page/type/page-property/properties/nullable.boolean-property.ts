import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const nullable = {
  id: "01a08d70-c263-7e18-b970-543a49a8397c",
  type: "page-type/boolean-property",
  slug: "nullable",
  propertySlug: "nullable",
  definition: "whether a page may state nothing under this property rather than a value",
  types: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying nothing here holds a value wherever a page states it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying true here is written as its kind or nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stating nothing and leaving the key out are two facts.",
    },
  ],
  createdAt: "2026-09-10T22:29:32.387Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies BooleanProperty
