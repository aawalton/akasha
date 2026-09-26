import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const coffeeShopDateTurnStates = {
  id: "01a0deed-a4cc-700b-860d-056b3c2e4b79",
  type: "page-type/file-property",
  slug: "coffee-shop-date-turn-states",
  propertySlug: "turn-states",
  definition: "what a character or place in the Coffee Shop Date was at, turn by turn",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The five faculties on a character's page hold across the whole story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The faculties that change turn by turn sit in this file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character states at every turn how that character would act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character states a turn whether or not the story takes that turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place's turn states are the story's true state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No program plays a character or a place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent writes each turn by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One row is one json object on one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row states the five faculties at one turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's position is the position of the turn the row is the state at.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
