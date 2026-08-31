import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const domainAncestors = {
  id: "01a0582e-282a-7ac8-89a0-dbb5b57e1616",
  pageTypeSlug: "context-warrant",
  slug: "domain-ancestors",
  definition: "what a seat must read for the domains above the one it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants every domain the one it states is a part of.",
    },
    {
      invariantKind: "departure",
      statement: "A domain above another is the one naming it among its parts.",
    },
    {
      invariantKind: "departure",
      statement: "The chain is walked to the top rather than one step.",
    },
    {
      invariantKind: "departure",
      statement: "A chain that turns back on itself is walked once.",
    },
    {
      invariantKind: "departure",
      statement: "The domain the seat states is no ancestor of itself.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating a domain nothing stands above warrants none.",
    },
  ],
} as const satisfies ContextWarrant
