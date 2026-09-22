import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exclusive = {
  id: "01a05cb3-7cca-7c81-8846-ff73179e6498",
  type: "page-type/module",
  slug: "exclusive",
  definition: "the turn a process takes over a path while it acts on it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn is a directory made beside the path the turn represents.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Making the turn is one act that fails where that turn already exists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn left by a process that is gone is taken rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is given up only by the process whose mark is in the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act that settles later keeps the turn until that act settles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller that waited too long is refused rather than acting anyway.",
    },
  ],
} as const satisfies Module
