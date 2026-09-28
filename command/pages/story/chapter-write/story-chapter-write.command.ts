import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyChapterWrite = {
  id: "01a0e96e-2932-74ae-9bb2-77118ec08e86",
  type: "page-type/command",
  slug: "story-chapter-write",
  definition: "the command starting the next chapter of a written story at the world builder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is started as the button on a written story's page starts it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat left untold after the chapter lands is named, and undoes nothing.",
    },
  ],
  name: "chapter-write",
  arguments: [{ argument: "argument/story", required: true }],
} as const satisfies Command
