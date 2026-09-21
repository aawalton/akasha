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
    { pageProperty: "relation-property/encounter-location", required: true, many: false },
    {
      pageProperty: "relation-property/encounter-entities",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/readable-trait", required: false, many: false },
    { pageProperty: "text-property/encounter-trigger", required: false, many: false },
    { pageProperty: "number-property/experience-reward", required: false, many: false },
    { pageProperty: "text-property/dropped-reward", required: false, many: false },
    {
      pageProperty: "record-property/encounter-gates",
      required: false,
      many: true,
      maxCount: null,
    },
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
  parts: [
    "relation-property/encounter-location",
    "relation-property/encounter-entities",
    "text-property/readable-trait",
    "text-property/encounter-trigger",
    "number-property/experience-reward",
    "text-property/dropped-reward",
    "number-property/gate-multiplier",
    "record-property/encounter-gates",
  ],
} as const satisfies PageType
