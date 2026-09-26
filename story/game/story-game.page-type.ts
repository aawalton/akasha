import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyGame = {
  id: "01a0673e-1000-7005-9766-e0a425ef3a66",
  type: "page-type/page-type",
  slug: "story-game",
  definition: "a story Alan plays through with a persona running the other side",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "story game" },
    { partOfSpeech: "part-of-speech/noun", spelling: "story games" },
  ],
  extends: ["page-type/collection"],
  parts: [
    "number-property/current-session",
    "select-property/controlled-entity-kind",
    "select-property/mechanics-weight",
    "select-property/resolution",
    "text-property/game-engine",
    "text-property/genre",
    "text-property/premise",
    "text-property/reader-framing",
    "text-property/themes",
    "text-property/tone",
    "text-property/card-vocabulary",
    "page-type/game-panel",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/external-id", required: true, many: false },
    { pageProperty: "text-property/game-engine", required: true, many: false },
    { pageProperty: "text-property/coordinator-agent", required: false, many: false },
    { pageProperty: "select-property/controlled-entity-kind", required: false, many: false },
    { pageProperty: "select-property/mechanics-weight", required: false, many: false },
    { pageProperty: "select-property/resolution", required: false, many: false },
    { pageProperty: "number-property/current-session", required: false, many: false },
    { pageProperty: "text-property/premise", required: false, many: false },
    { pageProperty: "text-property/tone", required: false, many: false },
    { pageProperty: "text-property/reader-framing", required: false, many: false },
    { pageProperty: "text-property/genre", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/themes", required: false, many: false },
    { pageProperty: "text-property/card-vocabulary", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/chapter-break", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a game holds of its own play is a page sitting under that game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game names the agent running the side Alan does not play.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game weighing its mechanics at zero settles an action by no formula.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game's premise and tone are Alan's own words for the game Alan asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game is keyed on its external id.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "The interface draws what play has revealed rather than everything the game knows.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The facts the play discloses beat the facts the design intended.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "No check of whether the machinery works takes a turn in a game being played.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A game master asks a mechanic for a number rather than working that number out.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a game's world holds is a page sitting under that game.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
