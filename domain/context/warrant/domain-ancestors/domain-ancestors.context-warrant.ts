import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const domainAncestors = {
  id: "01a0582e-282a-7ac8-89a0-dbb5b57e1616",
  type: "page-type/context-warrant",
  slug: "domain-ancestors",
  definition: "what a seat must read for the domains above the one it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat warrants every domain above the domain that seat answers for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A domain above another domain is the one naming that other domain among its parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chain is walked to the top rather than one step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The domain answered for is no ancestor of itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating an initiative walks from the domain that initiative names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating a domain with nothing above that domain warrants no domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a seat answers for is found under the page type its assignment states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chain above is answered by a graph predicate rather than walked here.",
    },
  ],
} as const satisfies ContextWarrant
