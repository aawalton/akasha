import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const states = {
  id: "01a0673c-8e0e-7016-9a4f-051e3200a488",
  type: "page-type/file-property",
  slug: "states",
  propertySlug: "states",
  definition: "what a game's world has been at, sitting by sitting",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A state row holds what is so now rather than everything that led to it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The interface reads the last row here for the turn, the pools and what is revealed.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Every part of a state is a page, and the interface reads those pages rather than a row.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
