import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnKeptList = {
  id: "01a0ea39-db29-78af-a3aa-0999fd2a6dde",
  type: "page-type/command",
  slug: "story-turn-kept-list",
  definition: "the command naming each edit kept beside a played turn and whether that edit fits",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list names each edit kept beside the turn, numbered by its place there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list says of each edit whether that edit fits the pages as they are now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list derives again each edit that no longer fits, as the turn's landing does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list keeps what it derived again only once every edit kept there fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list names the call taking one edit away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn keeping no edit is said rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no played turn here is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A list lands nothing.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/played-turn", required: true }],
} as const satisfies Command
