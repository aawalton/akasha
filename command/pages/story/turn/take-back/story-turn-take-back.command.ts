import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnTakeBack = {
  id: "01a0e7ea-d96e-773f-a163-c8112382cb14",
  type: "page-type/command",
  slug: "story-turn-take-back",
  definition: "the command taking back a played turn at player, as if its action was never sent",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: ["module/turn-commits"],
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
        "A turn's making runs from the commit making it to its latest commit moving it to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file of a turn's making is one a commit of its making changed in the story's folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file a commit of its making changed in the story's world, outside every story, is one too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the landing keeps from the pages is no file of the turn's making.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file of the turn's making goes back to its body before the turn was made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that had no body before the turn was made is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file of the turn's making changed since the turn moved to player is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A world file is refused and named where another story of the world changed during the making.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file beside the turn's page is taken away with the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number the turn's outcomes added to a page that goes back to its body is taken back by that body.",
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
      statement: "A take-back stops every reviewer and recorder seat of the turn's game.",
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
      decisionKind: "decision-kind/absence",
      statement:
        "An image made for the turn is left, since no page of the story holds it any longer.",
    },
  ],
  name: "take-back",
  arguments: [{ argument: "argument/played-turn", required: true }],
} as const satisfies Command
