import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const partsLengthInWords = {
  id: "01a06959-98a7-7ab5-991b-44150f978745",
  type: "page-type/computed-property",
  slug: "parts-length-in-words",
  propertySlug: "parts-length-in-words",
  definition: "how much there is to work through in the collections this one holds, in words",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This value is added up over the collection's parts rather than stated on that collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each part's own total length in words is added up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts are the collections naming this one under `part-of-collections`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection no other collection names is worth nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part stating no total of its own counts as nought rather than refusing.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
