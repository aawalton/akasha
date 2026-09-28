import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnCancel = {
  id: "01a0e7d8-5f60-71ff-af7a-8f3d30913009",
  type: "page-type/command",
  slug: "story-turn-cancel",
  definition: "the command taking away a played turn not yet published, as if it was never sent",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the latest turn of its story is cancelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at player is published, and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cancel takes the turn's page away with every file beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mechanics written for the turn are its history lines and the numbers its landed outcomes added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn with mechanics written is cancelled only where the call says to take them back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Taking a history back removes the turn's lines and sets the page's value to the line before them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no number at its value is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose history has no line before the turn's lines is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page whose history has a later turn's line after the turn's is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page both a history and an outcome changed is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A history taken back is taken away and written again, since a history is only appended to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a cancel does to the story lands in one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cancel holds its turn from reading it to landing, as an advance does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cancel stops every reviewer and recorder seat of the turn's game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cancel discards the recorders' edits kept beside the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cancel tells the game's game master, world builder and writer seats of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's game master cancels a turn, and so does a caller in no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice that fails after the landing is told, and undoes nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A story states no current turn, so nothing but the turn's own page is changed for it.",
    },
  ],
  name: "cancel",
  arguments: [
    { argument: "argument/played-turn", required: true },
    { argument: "argument/take-back-mechanics" },
  ],
} as const satisfies Command
