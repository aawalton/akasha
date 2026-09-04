import type { Module } from "@akasha/code-system/module"

export const ciNodeCapacity = {
  id: "01a06861-24c9-7006-b2fd-b9d14cae15d9",
  pageTypeSlug: "module",
  slug: "ci-node-capacity",
  definition: "the room each ci node has left for another step container",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A capacity read that fails admits nothing this tick rather than guessing at room.",
    },
    {
      invariantKind: "departure",
      statement:
        "A container awaiting a node is charged against every node, because any of them may take it.",
    },
    {
      invariantKind: "departure",
      statement: "A node's ceiling is what it can allocate less the containers that stand on it.",
    },
  ],
} as const satisfies Module
