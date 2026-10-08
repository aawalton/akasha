import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPort = {
  id: "01a11c02-cd8c-7bb1-8acb-3496f7fcce68",
  type: "page-type/module",
  slug: "quest-port",
  definition:
    "the port the keybind makes, from the focused quest's objective to the nearest travel point",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The focused quest is the quest the tracker assists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest that is complete or has no open condition ports toward where it ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The map is set to the zone holding the objective while the game answers where it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map goes back to the player's own location once the answer is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest step without a position ports nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer the game does not give within three seconds is given up on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An owned house is ported to outside rather than inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wayshrine away from a wayshrine is reached by recall, which costs gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing ports while the player is in combat or while recall is cooling down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every refusal and every port is said in chat.",
    },
  ],
} as const satisfies Module
