import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnState = {
  id: "01a0c6a7-a2f7-7b27-b8b9-4a73b2b251b4",
  type: "page-type/module",
  slug: "turn-state",
  definition: "the state an interface draws, read off a game's turn pages and its player's page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The state is the last turn page, with the sheet the player's page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The most a pool held is keyed by the pool's name with `Max` on the end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute is keyed by its page's slug in capitals, as the sheet showed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every window every turn raised is a beat of the log, in the order the turns were played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game with no turn page has no state.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
} as const satisfies Module
