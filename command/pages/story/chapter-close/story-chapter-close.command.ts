import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyChapterClose = {
  id: "01a0d4e4-a424-7f86-8eaa-79660d7af676",
  type: "page-type/command",
  slug: "story-chapter-close",
  definition: "the command making a chapter of a played story's open turns",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter takes every open turn of its story through the turn named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's prose is its title as a heading, then each turn's prose in order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window block in a turn's prose is carried into the chapter as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is numbered next after its story's last chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turns a chapter takes go in the same change that makes the chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn naming no prose file refuses the whole run.",
    },
  ],
  name: "chapter-close",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/through", required: true },
    { argument: "argument/title", required: true },
  ],
} as const satisfies Command
