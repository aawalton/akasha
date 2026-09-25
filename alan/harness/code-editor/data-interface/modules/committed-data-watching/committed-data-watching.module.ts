import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const committedDataWatching = {
  id: "01a0d99a-f5fd-78c4-9c85-232ca75a4d5f",
  type: "page-type/module",
  slug: "committed-data-watching",
  definition: "the pictures the editor draws from committed pages, taken again as a commit lands",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture here is made from committed pages alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture here is taken again when the branch the checkout is on moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The branch is the one the checkout's head names as the service starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch moves where its ref file or the packed refs change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture here is drawn from the pages on disk rather than from a change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These pictures run in a service of their own, since one takes seconds to draw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The loop holding these pictures is the loop the data watcher holds its own in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No landing waits on a picture here.",
    },
  ],
} as const satisfies Module
