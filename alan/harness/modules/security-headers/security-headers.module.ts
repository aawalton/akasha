import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const securityHeaders = {
  id: "01a05c48-deeb-7008-8b99-8ccaf9ccafa6",
  type: "page-type/module",
  slug: "security-headers",
  definition: "the content security policy and the fixed headers built for one response",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every site is served the same headers but for the headers its own policy widens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A site widens a policy directive and never narrows a policy directive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A directive a site names nothing for is left out.",
    },
  ],
} as const satisfies Module
