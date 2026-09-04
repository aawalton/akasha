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
      statement: "A seat warrants every domain above the one it answers for.",
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
      statement: "The domain answered for is no ancestor of itself.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating an initiative walks from the domain that initiative names.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating a domain nothing stands above warrants no domain.",
    },
    {
      invariantKind: "departure",
      statement: "The page a seat answers for is found under the page type its assignment states.",
    },
  ],
} as const satisfies ContextWarrant
