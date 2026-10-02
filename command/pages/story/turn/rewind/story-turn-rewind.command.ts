import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnRewind = {
  id: "01a0def9-1803-7531-bfb1-9a23ccb84b63",
  type: "page-type/command",
  slug: "story-turn-rewind",
  definition:
    "the command putting a played turn back to world-builder, undoing its making but keeping its action",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
      statement: "A rewind takes away the turn's prose file and its outcomes file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every other file of the turn's making goes back to its body before the turn, as a take-back puts it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "So the lore and place pages the turn's world builder and recorders landed go back to their bodies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turn's page is written again rather than taken away, as a take-back takes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file of the turn's making that a take-back would refuse refuses the rewind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rewind takes back every number the turn's landed outcomes added to a page that keeps its body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an outcome added is what its check's code names as added for that outcome.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line a later line replaces has nothing left to take back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An outcome only drafted is discarded with the recorders' edits and takes nothing back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An outcome whose check is no longer here refuses the rewind.",
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
      statement: "A rewind stops every reviewer and recorder seat of the turn's game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind discards the recorders' edits kept beside the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind tells the game's game master, world builder and writer seats of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any caller rewinds a turn, whatever seat the caller sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice that fails after the landing is told, and undoes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn already rewound lands nothing and is told again.",
    },
  ],
  name: "rewind",
  arguments: [
    { argument: "argument/played-turn", required: true },
    { argument: "argument/action-file" },
  ],
} as const satisfies Command
