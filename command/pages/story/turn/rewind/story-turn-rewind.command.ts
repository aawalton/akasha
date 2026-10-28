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
      statement: "A rewind takes away every file beside the turn's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind undoes what the turn's beats state they changed, as a take-back does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lore the turn's world builder wrote is the world's setup, and stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turn's page is written again rather than taken away, as a take-back takes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change a take-back would refuse refuses the rewind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind takes back every number the turn's landed outcomes added.",
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
        "A line stating `added` was never written onto a page, so its beats' changes undo it instead.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Only a line settled before outcomes kept `added` is taken back off its page.",
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
      statement:
        "A rewind at mechanics, reviewers or recorders stops each reviewer and recorder seat of its game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That stop ends a job in flight, so its work never lands on the turn made again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind at any other step stops no seat, since no job is in flight there.",
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
  createdAt: "2026-09-26T18:27:41.699Z",
  updatedAt: "2026-10-28T15:02:27.222Z",
} as const satisfies Command
