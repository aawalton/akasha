import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceBinding = {
  id: "01a0a6b4-83dc-7675-a214-0cac1da7fccd",
  type: "page-type/module",
  slug: "service-binding",
  definition: "the port and the host names a workstation service listens on, read off its page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The port a service listens on is read from that service's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no port leaves nothing to listen on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The host names a service is bound to are read from that service's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no host name leaves the loopback address bound alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug the index names no page for states no port and no host name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a service is read from is found by that service's slug.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here binds a host name or answers a request.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which service is being read.",
    },
  ],
} as const satisfies Module
