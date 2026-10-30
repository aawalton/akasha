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
      statement: "The message handing a step its beat is composed as `turn-beat-prompting` says.",
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
      statement: "A hand-out is tried again as `turn-hand-retrying` says before it is given up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused beat is handed to the game master seat with its issues.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The beat ready for a seat is worked out from the beats files whenever it asks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat asks for its next beat once its advance lands, so no beat waits on a message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story recorder seat's step is the recorder its flex number names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The hand-in giving a turn's last beat its memory tells the seats of the turn waiting next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's notes on a turn at beats go to the game master and writer seats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A one-seat story's beats go to no seat, and its notes to its game master seat.",
    },
  ],
  createdAt: "2026-10-27T19:54:42.651Z",
  updatedAt: "2026-10-30T12:49:16.246Z",
} as const satisfies Module
