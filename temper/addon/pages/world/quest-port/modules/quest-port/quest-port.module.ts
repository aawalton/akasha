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
      statement: "The objective is the first condition or ending the map can be set to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest whose every try fails is shown on its zone's map.",
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
      statement:
        "Where the objective's map has no travel point, the map zooms out and the game is asked again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That zoom out is what Alan does by hand, and it finds a dungeon's entrance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map goes back to the player's own location once the answer is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A breadcrumb answer is probed on other maps after the target is chosen and before the port.",
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
      statement: "Nothing ports while the player is in combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recall the cooldown only charges more for still ports, at the charged price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wayshrine is out of reach only while the game blocks recall outright.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every refusal and every port is said in chat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every press is written down, from the quest it read to the line it said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every press also writes down which actions the T key reaches at that moment.",
    },
  ],
  createdAt: "2026-10-08T14:55:08.172Z",
  updatedAt: "2026-10-10T13:55:00.117Z",
} as const satisfies Module
