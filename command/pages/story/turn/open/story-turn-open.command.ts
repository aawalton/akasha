import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnOpen = {
  id: "01a14b7c-a3e9-7c54-81b7-94193a4457a1",
  type: "page-type/command",
  slug: "story-turn-open",
  definition: "the command making a roleplayed story's opening turn, which has no action",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story is opened only while it is roleplayed and has no turn and no chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An opening is made at world-builder, so its prose is handed in with an advance as any turn's is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat that opens a story writes the opening.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An opening tells no seat, since the seat opening it is the seat it waits on.",
    },
  ],
  name: "open",
  arguments: [{ argument: "argument/story", required: true }],
  createdAt: "2026-10-17T20:10:22.056Z",
  updatedAt: "2026-10-17T20:10:22.056Z",
} as const satisfies Command
