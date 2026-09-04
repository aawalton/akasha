import type { FileProperty } from "@akasha/pages-system/file-property"

export type TurnStates = "jsonl"

export const turnStates = {
  id: "01a06828-cb99-70d4-bcad-c28091bb8c4c",
  pageTypeSlug: "file-property",
  slug: "turn-states",
  propertySlug: "turn-states",
  definition: "what an element stood at, turn by turn",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
    {
      invariantKind: "departure",
      statement: "A row states the same five faculties the element's page states.",
    },
    {
      invariantKind: "departure",
      statement: "A row's position is the position of the turn the row is the state at.",
    },
  ],
} as const satisfies FileProperty
