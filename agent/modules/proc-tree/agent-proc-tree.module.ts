import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentProcTree = {
  id: "01a0686d-9d5e-700a-b949-3878b576dfa8",
  type: "page-type/module",
  slug: "agent-proc-tree",
  definition:
    "an agent's processes: which whole trees it has outlived, and which are the caller's own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent whose processes form one tree has outlived no tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree kept is the tree with the stated keeper.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree kept where no keeper is stated is the tree holding the newest process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process the caller is running in is never read as another agent's process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The invocation a caller runs inside reaches up to the nearest agent process.",
    },
  ],
} as const satisfies Module
