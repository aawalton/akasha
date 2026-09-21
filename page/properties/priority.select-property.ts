import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const priority = {
  id: "01a0c537-0fde-7c44-baa5-1aa0541d3b1a",
  type: "page-type/select-property",
  slug: "priority",
  propertySlug: "priority",
  definition: "how soon a thing is wanted against its siblings",
  values: ["p1", "p2", "p3", "p4"],
  optionColors: [
    { value: "p1", color: "color/red" },
    { value: "p2", color: "color/yellow" },
    { value: "p3", color: "color/blue" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A priority is written `p` before its number.",
    },
    { decisionKind: "decision-kind/departure", statement: "A lower number is wanted sooner." },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last priority is drawn in no color of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page type wanting a priority declares this one.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
