import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBarAnswering = {
  id: "01a0d487-4384-79e4-9941-54854ae13d0b",
  type: "page-type/module",
  slug: "action-bar-answering",
  definition: "what a route answers when a player sends a game an action from its action bar",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The test proving this code sits beside the route serving this code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is a message to the seat the game names as its coordinator agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every action is sent under the one name the action bar sends from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body of the message is the action as typed, brackets and all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller who is not signed in is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller signed in as any person but the one the game master's seat answers to is refused.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The person a game is played for is read off its game master's seat, because no game names a person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no seat, or a seat nobody holds, is answered as no game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The message is written through the page forwarder, as no page service runs beside the web server.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An action still waiting is a message from the action bar to that seat which no one has claimed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The actions waiting are read from the page forwarder, which sees a claim.",
    },
  ],
} as const satisfies Module
