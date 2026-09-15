import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureLearning = {
  id: "01a077fb-4ca8-7027-80b1-85c446d6786a",
  type: "page-type/command",
  slug: "measure-learning",
  definition: "the command saying how far through Learn Everything Alan has got, part by part",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading runs from nought to seven.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is read off the tree rather than folded again here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows come in the order the book puts its parts in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last row is the whole book rather than a part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is one part of the book rather than one topic beneath a part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is every topic under a part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part counts itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are padded into columns rather than parted by a mark.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "learning",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
