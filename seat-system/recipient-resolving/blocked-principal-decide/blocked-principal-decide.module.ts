import type { Module } from "@akasha/code-system/module"

export const blockedPrincipalDecide = {
  id: "01a0686d-9d5e-7019-8649-bafbe4a8eaa2",
  pageTypeSlug: "module",
  slug: "blocked-principal-decide",
  definition: "who is waiting on a blocked agent, which nothing in the pages yet says",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Nothing binds an agent to work another party waits on.",
    },
    {
      invariantKind: "departure",
      statement: "This module says no principal is derivable rather than naming a guess.",
    },
    {
      invariantKind: "departure",
      statement: "An agent with no name is reported as unnamed rather than left out of the reason.",
    },
  ],
} as const satisfies Module
