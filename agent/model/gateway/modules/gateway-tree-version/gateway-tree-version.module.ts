import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gatewayTreeVersion = {
  id: "01a069d1-5918-7000-93b1-fb263acda9d0",
  type: "module",
  slug: "gateway-tree-version",
  definition: "the gateway's own file closure, hashed, so a supervisor can tell its proxy changed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is reached by asking the graph what that file reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every module the gateway reaches that way is in the closure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member that cannot be read refuses the hash rather than shortening it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every path the hash names is relative to the repository root.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A specifier naming a package is not followed.",
    },
  ],
} as const satisfies Module
