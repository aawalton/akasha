import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const partsProgressInWords = {
  id: "01a06959-98a7-7e83-8ec2-6370d810f6b3",
  type: "page-type/computed-property",
  slug: "parts-progress-in-words",
  propertySlug: "parts-progress-in-words",
  definition: "how far through the collections this one has the reading has come, in words",
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
      statement: "Each part's own total progress in words is added up.",
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
