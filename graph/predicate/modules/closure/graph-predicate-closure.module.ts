import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const graphPredicateClosure = {
  id: "01a0a5ef-108b-7e25-8e6c-7dfb7d221cf4",
  type: "module",
  slug: "graph-predicate-closure",
  definition: "the closure a predicate takes in from the seeds it is handed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One ask answers a closure whichever way its predicate follows an edge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which edges are followed and which way is read off the predicate handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seeds a closure starts from are handed to the ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seed the ask takes in is part of the closure the ask answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which nodes a closure takes in is handed to the ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask taking in every node it reaches says so by handing in no gate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A predicate followed out of a file is answered from a reader of file bodies.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A predicate followed into a file reads no body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask handing in no reader is refused where its predicate is followed out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node already in the closure is stepped from once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file no edge is read out of is still part of the closure that reached it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The closure comes back sorted, so two asks alike answer alike.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No caller names an edge kind or a direction of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads an edge, which the graph is asked for.",
    },
  ],
} as const satisfies Module
