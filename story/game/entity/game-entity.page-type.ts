import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameEntity = {
  id: "01a0c631-b09e-76b0-8b33-5a7ff9d75891",
  type: "page-type/page-type",
  slug: "game-entity",
  definition: "someone or something a game's world holds, with the sheet its mechanics read",
  pluralSlug: "entities",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/entity-game", required: true, many: false },
    { pageProperty: "text-property/entity-kind", required: true, many: false },
    { pageProperty: "text-property/entity-class", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity's sheet is properties of its page rather than a document in a row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity sits under the game whose world holds it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No entity holds a number one of its game's mechanics works out.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "relation-property/entity-game",
    "text-property/entity-kind",
    "text-property/entity-class",
  ],
} as const satisfies PageType
