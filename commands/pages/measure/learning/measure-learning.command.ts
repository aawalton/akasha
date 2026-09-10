import type { Command } from "../../../command.page-type.types.ts"

export const measureLearning = {
  id: "01a077fb-4ca8-7027-80b1-85c446d6786a",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-learning",
  definition:
    "how far through the Book of Everything Alan has got, part by part and over the whole",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--json",
      takes: "give the reading as one line of JSON rather than as a table",
    },
  ],
  helpNotes: [
    "a reading runs from nought to seven rather than from nought to a hundred.",
    "a part's reading is folded up out of the topics beneath that part rather than kept on its own page.",
    "the parts come in the order the book puts them in rather than in the order the readings sort.",
    "the last row is the whole book rather than a part of it.",
    "a count is every topic under a part, counting that part itself.",
  ],
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
} as const satisfies Command
