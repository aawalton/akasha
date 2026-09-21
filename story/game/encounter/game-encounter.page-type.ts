import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameEncounter = {
  id: "01a0c646-f4a2-7d92-926e-fd2c7fef9eb1",
  type: "page-type/page-type",
  slug: "game-encounter",
  definition: "what a place sets in the way of the one playing through it",
  pluralSlug: "encounters",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/holding-game", required: true, many: false },
    { pageProperty: "text-property/listed-note", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An encounter belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An encounter names the entities in it rather than holding their sheets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An encounter sits under the place that sets it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No encounter holds what happened when it was played.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
