import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

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
      statement: "One initiative has one hold at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A hold for an initiative is the intents that initiative is drawn with.",
    },
    {
      invariantKind: "departure",
      statement: "A hold for an initiative is that the initiative is drawn away.",
    },
    {
      invariantKind: "departure",
      statement: "A hold names the intents held to be going as well as the intents left.",
    },
    {
      invariantKind: "departure",
      statement: "An intent is followed between two orders by its statement rather than its key.",
    },
    {
      invariantKind: "departure",
      statement: "The intents drawn are numbered again from `1` in the order held.",
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
      statement: "The intent an order moves is named by its statement rather than by its place.",
    },
    {
      invariantKind: "departure",
      statement: "The place that intent leaves is read off the order held.",
    },
    {
      invariantKind: "departure",
      statement: "The place an order moves an intent onto is named by the intent already there.",
    },
    {
      invariantKind: "departure",
      statement: "An intent moved onto an intent the order does not hold holds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every hold is settled over the rows in the order the holds were made.",
    },
    {
      invariantKind: "departure",
      statement: "A hold the file agrees with is let go.",
    },
    {
      invariantKind: "departure",
      statement: "A hold the file has left behind is let go.",
    },
    {
      invariantKind: "departure",
      statement: "A stale hold still waiting on a landing is settled over the rows and kept.",
    },
    {
      invariantKind: "departure",
      statement: "A hold counts the landings that hold is waiting on.",
    },
    {
      invariantKind: "departure",
      statement: "Making a hold counts one landing more.",
    },
    {
      invariantKind: "departure",
      statement: "A landing answering counts one landing less.",
    },
    {
      invariantKind: "departure",
      statement: "A hold waiting on no landing is let go however the file reads.",
    },
    {
      invariantKind: "departure",
      statement: "A hold outlives no landing that hold was made for.",
    },
    {
      invariantKind: "departure",
      statement: "A landing answering more often than a hold was made counts down to `0`.",
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
