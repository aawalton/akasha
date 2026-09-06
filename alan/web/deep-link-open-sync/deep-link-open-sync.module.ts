import type { Module } from "@akasha/code/module"

export const deepLinkOpenSync = {
  id: "01a0655d-dab8-7c58-8569-1c6e3295591b",
  pageTypeSlug: "module",
  slug: "deep-link-open-sync",
  definition: "a link the native shell was opened by, carried into the router",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A link naming a widget counts a tap on that widget.",
    },
    {
      invariantKind: "departure",
      statement: "A link naming no widget counts nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A tap is counted before the link is routed.",
    },
    {
      invariantKind: "departure",
      statement: "A tap that cannot be counted leaves the routing alone.",
    },
    {
      invariantKind: "departure",
      statement: "A link the router refuses counts its tap all the same.",
    },
  ],
} as const satisfies Module
