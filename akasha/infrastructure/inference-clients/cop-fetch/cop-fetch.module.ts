import type { Module } from "@akasha/code-system/module"

export const copFetch = {
  id: "01a0685d-4b35-700d-9c90-fb07ff5e3a7d",
  pageTypeSlug: "module",
  slug: "cop-fetch",
  definition: "the request settings a call through the traffic cop is made with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The request carries a deadline of its own rather than the runtime's.",
    },
    {
      invariantKind: "departure",
      statement:
        "The runtime's own idle timeout is turned off, so a slow cold model load is waited out.",
    },
  ],
} as const satisfies Module
