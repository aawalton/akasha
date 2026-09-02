import type { Module } from "../../code-system/modules/module.page-type.ts"

export const securityHeaders = {
  id: "01a05c48-deeb-7008-8b99-8ccaf9ccafa6",
  pageTypeSlug: "module",
  slug: "security-headers",
  definition: "the content security policy and the fixed headers built for one response",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A site widens a policy directive and never narrows a policy directive.",
    },
    {
      invariantKind: "departure",
      statement: "A directive a site names nothing for is left out.",
    },
  ],
} as const satisfies Module
