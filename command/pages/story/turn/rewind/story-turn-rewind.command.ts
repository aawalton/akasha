import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnRewind = {
  id: "01a0def9-1803-7531-bfb1-9a23ccb84b63",
  type: "page-type/command",
  slug: "story-turn-rewind",
  definition: "the command putting a played turn back to world-builder, keeping only its action",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the latest turn of its story is rewound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewound turn states what a turn made from its action states, and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind takes away the turn's prose file and its rolls file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a rewind does to the turn lands in one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action file names the action a turn is rewound with, in place of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating no action is rewound only with an action file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind stops every reviewer and writer seat of the turn's game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind tells the game's game master and world builder seats of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any caller rewinds a turn, whatever seat the caller sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice that fails after the landing is told, and undoes nothing.",
    },
  ],
  name: "rewind",
  arguments: [
    { argument: "argument/played-turn", required: true },
    { argument: "argument/action-file" },
  ],
} as const satisfies Command
