import type { Command } from "akasha/commands/command.page-type.types.ts"

export const initiativeWorkTree = {
  id: "01a06866-8b85-79cd-a698-d3fa3f18a57b",
  type: "command",
  slug: "initiative-work-tree",
  definition: "the command drawing each initiative under the one above it, and the intents it has",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--counts", takes: "how many initiatives and how many intents the tree holds" },
    { said: "--colors", takes: "the color each initiative is drawn in, keyed by its slug" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree is composed at the moment of asking rather than read from a store.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative is keyed by the slug the initiative declares rather than by the file name.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative whose parent is not there is drawn as a root and stays in the tree.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative whose parent chain closes into a cycle is drawn as a root.",
    },
    {
      invariantKind: "departure",
      statement: "The intents an initiative has are drawn beneath that initiative.",
    },
    {
      invariantKind: "departure",
      statement: "An intent keeps the place its initiative states rather than being sorted.",
    },
    {
      invariantKind: "departure",
      statement: "The intents come ahead of the initiatives beneath.",
    },
    {
      invariantKind: "departure",
      statement: "An intent is keyed by its initiative's slug and its place in that list.",
    },
    {
      invariantKind: "departure",
      statement: "An intent opens the page of the initiative with that intent.",
    },
    {
      invariantKind: "departure",
      statement: "An intent has its working memory as its note.",
    },
    {
      invariantKind: "departure",
      statement: "A row says whether the row is an initiative or an intent.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are counted by the kind each row is rather than all together.",
    },
    {
      invariantKind: "departure",
      statement: "Each word names the thing to print.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no word prints the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming two words is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A word said twice names one thing rather than two things.",
    },
    {
      invariantKind: "departure",
      statement: "The colors are read from the seat pages alone.",
    },
    {
      invariantKind: "absence",
      statement: "Reading the colors opens no initiative page.",
    },
    {
      invariantKind: "absence",
      statement: "An intent has no color.",
    },
    {
      invariantKind: "absence",
      statement: "An initiative no seat sits on has no color.",
    },
    {
      invariantKind: "absence",
      statement: "An intent leads nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A tree with no initiative is refused rather than printed as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A tree with no initiative is a fault of the data.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "work-tree",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
