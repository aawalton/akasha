import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const extendsType = {
  id: "01a049b9-856c-78f3-ac14-e3f86c75d104",
  type: "page-type/multi-relation-property",
  slug: "extends-type",
  propertySlug: "extends",
  definition: "a type that gives a type its properties",
  targetPageType: "page-type/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A type takes its properties from every type this names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nearer type decides where two of the types named declare one property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last named type decides where two types are equally near.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reordering the types changes the type's properties.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type naming no type states an empty list rather than nothing.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
