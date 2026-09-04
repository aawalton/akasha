import type { Module } from "@akasha/code-system/module"

export const exclusive = {
  id: "01a05cb3-7cca-7c81-8846-ff73179e6498",
  pageTypeSlug: "module",
  slug: "exclusive",
  definition: "the turn one process takes over a path while it acts on it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The turn is a directory made beside the path the turn stands for.",
    },
    {
      invariantKind: "departure",
      statement: "Making it is one act that fails where it already stands.",
    },
    {
      invariantKind: "departure",
      statement: "A turn left by a process that is gone is taken rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is given up only by the process whose mark stands in the turn.",
    },
    {
      invariantKind: "departure",
      statement: "An act that settles later keeps the turn until that act settles.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that waited too long is refused rather than acting anyway.",
    },
  ],
} as const satisfies Module
