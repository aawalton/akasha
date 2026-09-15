import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const turnStates = {
  id: "01a06828-cb99-70d4-bcad-c28091bb8c4c",
  type: "page-type/file-property",
  slug: "turn-states",
  propertySlug: "turn-states",
  definition: "what an element was at, turn by turn",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One row is one json object on one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row states the same five faculties the element's page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's position is the position of the turn the row is the state at.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
