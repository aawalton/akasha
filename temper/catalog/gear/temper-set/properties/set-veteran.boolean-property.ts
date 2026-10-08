import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const setVeteran = {
  id: "01a0d8e1-0ec1-76c8-b7aa-092d7be90f4f",
  type: "page-type/boolean-property",
  slug: "set-veteran",
  propertySlug: "set-veteran",
  definition: "whether every piece of a set drops only on veteran difficulty",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set not veteran states nothing rather than false.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T14:03:43.169Z",
  updatedAt: "2026-09-25T14:03:50.000Z",
} as const satisfies BooleanProperty
