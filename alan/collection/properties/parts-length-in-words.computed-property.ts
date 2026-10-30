import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const partsLengthInWords = {
  id: "01a06959-98a7-7ab5-991b-44150f978745",
  type: "page-type/computed-property",
  slug: "parts-length-in-words",
  propertySlug: "parts-length-in-words",
  definition: "the length of the parts of a collection counted in words",
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
      statement:
        "The parts are the collections naming this one under `part-of-collections` or as their story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part at a step status other than player is unpublished and counts nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection no other collection names is worth nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part stating no total of its own counts as nought rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part archived counts nothing toward what there is to work through.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T22:17:54.599Z",
  updatedAt: "2026-10-30T15:10:59.874Z",
} as const satisfies ComputedProperty
