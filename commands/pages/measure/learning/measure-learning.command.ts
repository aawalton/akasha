import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureLearning = {
  id: "01a077fb-4ca8-7027-80b1-85c446d6786a",
  type: "command",
  slug: "measure-learning",
  definition:
    "the command saying how far through the Book of Everything Alan has got, part by part",
  code: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading runs from nought to seven.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is read off the tree rather than folded again here.",
    },
    {
      invariantKind: "departure",
      statement: "The rows come in the order the book puts its parts in.",
    },
    {
      invariantKind: "departure",
      statement: "The last row is the whole book rather than a part.",
    },
    {
      invariantKind: "departure",
      statement: "A row is one part of the book rather than one topic beneath a part.",
    },
    {
      invariantKind: "departure",
      statement: "A count is every topic under a part.",
    },
    {
      invariantKind: "departure",
      statement: "A part counts itself.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are padded into columns rather than parted by a mark.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "learning",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
