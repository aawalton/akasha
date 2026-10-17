import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnMake = {
  id: "01a14ad9-e67e-7156-94e3-b0c8663a186e",
  type: "page-type/command",
  slug: "story-turn-make",
  definition: "the command making a played turn from what a roleplay conversation played",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made here from an action read from a file, at world-builder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn made here is roleplayed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn made here is made only once the story's latest turn reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn made here follows the latest turn, or the last chapter's last turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn made here counts as reviewed, since Alan read its prose as it was played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A making holds the turn it follows from reading it to landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A making tells no seat and pushes Alan nothing.",
    },
  ],
  name: "make",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/action-file", required: true },
  ],
  createdAt: "2026-10-17T17:12:36.732Z",
  updatedAt: "2026-10-17T17:12:36.732Z",
} as const satisfies Command
