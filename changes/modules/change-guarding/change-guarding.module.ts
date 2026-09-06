import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const changeGuarding = {
  id: "01a07744-1311-7679-acd5-cea149b8e44a",
  pageTypeSlug: "module",
  slug: "change-guarding",
  definition: "the guards a change names, run over the answer that change gives",
  code: "ts",
  types: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A guard is handed the answer a change gives.",
    },
    {
      invariantKind: "departure",
      statement: "A guard is handed the files and the index that answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A guard is handed the root that answer was worked out against.",
    },
    {
      invariantKind: "departure",
      statement: "The index that answer leaves names no page that answer takes away.",
    },
    {
      invariantKind: "departure",
      statement: "The paths an answer takes away are read here rather than by each guard.",
    },
    {
      invariantKind: "departure",
      statement: "A path a move leaves behind is no path taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow that will not build refuses rather than answering no reference.",
    },
    {
      invariantKind: "departure",
      statement: "An answer already refused runs no guard.",
    },
    {
      invariantKind: "departure",
      statement: "The first guard to refuse gives the reason.",
    },
    {
      invariantKind: "departure",
      statement: "No guard runs after a guard refuses.",
    },
  ],
} as const satisfies Module
