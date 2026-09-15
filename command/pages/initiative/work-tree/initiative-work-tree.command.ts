import type { Command } from "akasha/command/command.page-type.types.ts"

export const initiativeWorkTree = {
  id: "01a06866-8b85-79cd-a698-d3fa3f18a57b",
  type: "command",
  slug: "initiative-work-tree",
  definition: "the command drawing each initiative under the one above it, and the intents it has",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree is composed at the moment of asking rather than read from a store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An initiative is keyed by the slug the initiative declares rather than by the file name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An initiative whose parent is not there is drawn as a root and stays in the tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative whose parent chain closes into a cycle is drawn as a root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The intents an initiative has are drawn beneath that initiative.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent keeps the place its initiative states rather than being sorted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The intents come ahead of the initiatives beneath.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent is keyed by its initiative's slug and its place in that list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent opens the page of the initiative with that intent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent has its working memory as its note.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row says whether the row is an initiative or an intent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are counted by the kind each row is rather than all together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each word names the thing to print.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no word prints the tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming two words is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word said twice names one thing rather than two things.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The colors are read from the seat pages alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Reading the colors opens no initiative page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An intent has no color.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An initiative no seat sits on has no color.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An intent leads nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree with no initiative is refused rather than printed as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree with no initiative is a fault of the data.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "work-tree",
  arguments: [
    { argument: "argument/json", notWith: ["argument/counts", "argument/colors"] },
    { argument: "argument/counts", notWith: ["argument/json", "argument/colors"] },
    { argument: "argument/colors", notWith: ["argument/json", "argument/counts"] },
  ],
} as const satisfies Command
