import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyChat = {
  id: "01a17ec7-f439-7a26-afdd-d26a50ff074a",
  type: "page-type/command",
  slug: "story-chat",
  definition: "the command saying one message in a story played's chat, as the calling seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is said as the seat the calling agent sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is one line appended to the story's chat, and lands as a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no story played here is refused, and nothing is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message saying nothing is refused.",
    },
  ],
  name: "chat",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/body-file", notWith: ["argument/body"], oneOf: ["argument/body"] },
    { argument: "argument/body" },
  ],
  createdAt: "2026-10-27T19:13:15.832Z",
  updatedAt: "2026-10-27T19:13:15.832Z",
} as const satisfies Command
