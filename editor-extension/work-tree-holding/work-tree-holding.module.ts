import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeHolding = {
  id: "01a08c6d-8191-7d5c-b5f6-f8cb8476d6e0",
  pageTypeSlug: "module",
  type: "module",
  slug: "work-tree-holding",
  definition:
    "what the work panel draws for an initiative until the file the service writes has it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One initiative has one thing held for it at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is held for an initiative is the intents it is drawn with, or that it is drawn away.",
    },
    {
      invariantKind: "departure",
      statement: "What is held names the intents held to be going as well as the intents left.",
    },
    {
      invariantKind: "departure",
      statement: "An intent is followed between two orders by its statement rather than its key.",
    },
    {
      invariantKind: "departure",
      statement: "The intents drawn are renumbered from one in the order held.",
    },
    {
      invariantKind: "departure",
      statement: "The rows beneath an initiative that are no intent keep their places.",
    },
    {
      invariantKind: "departure",
      statement: "An intent held to be going is left out of the intents drawn.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative held to be gone is left out of the rows drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A file with the intents held in the order held agrees.",
    },
    {
      invariantKind: "departure",
      statement: "A file with the same intents in another order is stale rather than gone.",
    },
    {
      invariantKind: "departure",
      statement: "A file still holding an intent held to be going is stale rather than gone.",
    },
    {
      invariantKind: "departure",
      statement: "A file that lost one of two intents held to be going is stale rather than gone.",
    },
    {
      invariantKind: "departure",
      statement: "A file missing an intent held to be staying is gone rather than stale.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding an intent held neither way is gone rather than stale.",
    },
    {
      invariantKind: "departure",
      statement: "A file without an initiative held to be gone agrees.",
    },
    {
      invariantKind: "departure",
      statement: "A file with an initiative held to be gone is stale rather than gone.",
    },
    {
      invariantKind: "departure",
      statement: "An intent taken out while an order is held is taken out of that order.",
    },
    {
      invariantKind: "departure",
      statement: "An order moved while an intent is held to be going keeps that intent going.",
    },
    {
      invariantKind: "departure",
      statement: "An intent no order holds is held to be going by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every hold is settled over the rows in the order the holds were made.",
    },
    {
      invariantKind: "departure",
      statement: "A hold the file agrees with, and a hold the file has left behind, are let go.",
    },
    {
      invariantKind: "departure",
      statement: "A stale hold is settled over the rows and kept.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are composed here and handed back rather than given to the editor.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here calls the harness.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the initiative's page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
