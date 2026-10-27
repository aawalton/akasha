import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnBeatHanding = {
  id: "01a17eed-e65b-7791-a2ff-e8762bf5f688",
  type: "page-type/module",
  slug: "turn-beat-handing",
  definition: "the one beat each step's seat is handed as a hand-in makes that beat ready",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each step is one seat of the story, handed one beat at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step is handed a beat as the hand-in that makes it ready lands, and at no other time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat ready before a hand-in and ready after it is not handed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So a step working on a beat is handed nothing until it hands that beat in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The message names the turn and the beat, and carries the beat's line as it is now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The numbers seat works each beat by the mechanics, inventory and plan instructions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's beats flow across the story's turns at beats, the earliest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat that could not be handed out is named in the answer, and undoes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused beat is handed to the game master seat with its issues.",
    },
  ],
  createdAt: "2026-10-27T19:54:42.651Z",
  updatedAt: "2026-10-27T20:26:52.073Z",
} as const satisfies Module
