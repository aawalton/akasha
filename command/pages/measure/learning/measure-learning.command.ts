import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureLearning = {
  id: "01a077fb-4ca8-7027-80b1-85c446d6786a",
  type: "command",
  slug: "measure-learning",
  definition: "the command saying how far through Learn Everything Alan has got, part by part",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading runs from nought to seven.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is read off the tree rather than folded again here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows come in the order the book puts its parts in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last row is the whole book rather than a part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is one part of the book rather than one topic beneath a part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count is every topic under a part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part counts itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are padded into columns rather than parted by a mark.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "learning",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
