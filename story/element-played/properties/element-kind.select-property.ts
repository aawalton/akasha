import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const elementKind = {
  id: "01a06828-cb97-7ee3-9578-4a81ad1884a6",
  type: "page-type/select-property",
  slug: "element-kind",
  propertySlug: "element-kind",
  definition: "whether an element wants or only tends",
  values: ["agent", "setting"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent is an element that wants something of the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting is an element whose wanting is law rather than desire.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
