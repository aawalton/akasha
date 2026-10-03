import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelDrawing = {
  id: "01a0c4a0-5cab-7fbb-bff7-7af9f2ab4dbf",
  type: "page-type/module",
  slug: "panel-drawing",
  definition: "what every panel of a game's interface is handed to draw itself",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel is handed the same thing, whatever that panel draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel reads what it needs off what it was handed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a panel is handed is the state of the game and the run of the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel is handed the cover of every turn at player with that turn's number, drawn or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those covers take in the covers of the turns the story's chapters took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each cover names the turn or chapter whose prose holds it and the words it is drawn after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel is handed the page type of the turns it is handed where those are not turns played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is handed the story's character player, or nothing where it has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel is handed the story's own address and the player's intent as that story holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel is handed the story's in-game time and the appointments still to come, or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel is handed what sends the game a choice, where the game has a game master.",
    },
  ],
} as const satisfies Module
