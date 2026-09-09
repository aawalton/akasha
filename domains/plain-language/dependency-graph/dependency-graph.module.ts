import type { Module } from "@akasha/code/module"

export const dependencyGraph = {
  id: "01a06cd8-d030-7f85-92a3-d5c7d03b4e55",
  pageTypeSlug: "module",
  type: "module",
  slug: "dependency-graph",
  definition: "the tree a sentence's words make",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is numbered by its place in its sentence.",
    },
    {
      invariantKind: "departure",
      statement: "A head of zero names the root.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence has one root.",
    },
    {
      invariantKind: "departure",
      statement: "An offset is an index into the whole document rather than into one sentence.",
    },
    {
      invariantKind: "departure",
      statement: "A relation is matched by its own name or by the name before its colon.",
    },
    {
      invariantKind: "departure",
      statement: "A tie between two heads is broken toward the lower token.",
    },
    {
      invariantKind: "departure",
      statement: "A cycle is broken by the swap that costs the least score.",
    },
    {
      invariantKind: "departure",
      statement: "A token the model built carries how sure the model was of each class.",
    },
    {
      invariantKind: "departure",
      statement: "A confidence is the chance the model gave the class the model chose.",
    },
    {
      invariantKind: "departure",
      statement: "A token built by hand has no confidence.",
    },
  ],
} as const satisfies Module
