import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const graphPredicateClosure = {
  id: "01a0a5ef-108b-7e25-8e6c-7dfb7d221cf4",
  type: "page-type/module",
  slug: "graph-predicate-closure",
  definition: "the closure a predicate takes in from the seeds it is handed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One ask answers a closure whichever way its predicate follows an edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which edges are followed and which way is read off the predicate handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seeds a closure starts from are handed to the ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed the ask takes in is part of the closure the ask answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which nodes a closure takes in is handed to the ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask taking in every node it reaches says so by handing in no gate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A predicate followed out of a file is answered from a reader of file bodies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A predicate followed into a file reads no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask handing in no reader is refused where its predicate is followed out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node already in the closure is stepped from once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file no edge is read out of is still part of the closure that reached it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nodes come back sorted, so two asks alike answer alike.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No caller names an edge kind or a direction of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads an edge, which the graph is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask answers the edges a closure took in as well as the nodes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An edge reaching a node already taken in is answered, so a closure shows its cycles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge the gate refuses the far end of is no part of the closure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask wanting only the nodes is answered only those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A predicate following an attribute value takes in only an edge carrying that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge a predicate does not follow leaves the node beyond that edge unreached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An edge carrying none of an attribute a predicate follows is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A closure says how many steps from the seeds each node it took in was reached at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The steps a node is reached at are the fewest edges reaching it from the seeds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is reached at no steps from the seeds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nodes one step out are walked before the nodes two steps out.",
    },
  ],
} as const satisfies Module
