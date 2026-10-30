import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const securityHeaders = {
  id: "01a05c48-deeb-7008-8b99-8ccaf9ccafa6",
  type: "page-type/module",
  slug: "security-headers",
  definition: "the response headers a router app sends for safety",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every site is served the same headers but for the headers its own policy widens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site widens a policy directive and never narrows a policy directive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directive a site names nothing for is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The microphone is refused to every site but one whose policy asks for it.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-10-30T15:37:26.425Z",
} as const satisfies Module
