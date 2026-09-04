import type { Module } from "@akasha/code-system/module"

export const proxy = {
  id: "01a06863-8e7c-79d7-b834-766a91baff9f",
  pageTypeSlug: "module",
  slug: "proxy",
  definition: "a request sent on to its target, the caller named on it or not",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request sent on for a known caller carries that caller's name in its headers.",
    },
    {
      invariantKind: "departure",
      statement: "A redirect from the target is handed back rather than followed.",
    },
    {
      invariantKind: "departure",
      statement: "A body is passed on still compressed.",
    },
    {
      invariantKind: "absence",
      statement: "No websocket target is sent on from here.",
    },
  ],
} as const satisfies Module
