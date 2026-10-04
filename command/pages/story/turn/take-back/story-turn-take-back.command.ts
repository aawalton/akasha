import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnTakeBack = {
  id: "01a0e7ea-d96e-773f-a163-c8112382cb14",
  type: "page-type/command",
  slug: "story-turn-take-back",
  definition: "the command taking back a played turn at player, as if its action was never sent",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the latest turn of its story is taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a turn at player is taken back, and a turn before player is cancelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every file of the turn's making goes back to its body before the turn, the turn's page too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number the turn's outcomes added to any other page is taken back as a rewind takes it back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a take-back does to the story lands in one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take-back holds its turn from reading it to landing, as an advance does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take-back stops no seat, since no reviewer or recorder has a job at player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take-back discards the recorders' edits kept beside the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take-back tells the game's game master, world builder and writer seats of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That notice names the story's latest turn once the turn is taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any caller takes back a turn, whatever seat the caller sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice that fails after the landing is told, and undoes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take-back puts the turn's action in its story's action draft once it lands.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A take-back sends no action, and the player alone sends the draft again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "An image made for the turn is left, since no page of the story holds it any longer.",
    },
  ],
  name: "take-back",
  arguments: [{ argument: "argument/played-turn", required: true }],
} as const satisfies Command
