import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnNext = {
  id: "01a17f1e-37db-77d2-b4da-7c599d3173bf",
  type: "page-type/command",
  slug: "story-turn-next",
  definition: "the command handing the calling seat the beat ready for its step",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The beat handed is the one ready for the calling seat's step, in its story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is ready is read from the beats files of the story's turns at beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is the message a hand-in would have sent that seat for that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat no beat is ready for is told so rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller holding no role in a story is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Asking lands nothing and sends no message.",
    },
  ],
  name: "next",
  createdAt: "2026-10-27T20:47:29.242Z",
  updatedAt: "2026-10-27T20:47:29.242Z",
} as const satisfies Command
