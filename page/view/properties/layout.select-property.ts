import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const layout = {
  id: "01a0680d-4d00-7003-9c58-7b4e2a6d4104",
  type: "page-type/select-property",
  slug: "layout",
  propertySlug: "layout",
  definition: "a view's arrangement of its pages",
  values: ["cards", "gallery", "list", "notes", "table"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A layout is how the answer is shown rather than part of the question.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
