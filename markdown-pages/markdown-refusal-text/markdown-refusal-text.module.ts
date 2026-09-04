import type { Module } from "@akasha/code-system/module"

export const markdownRefusalText = {
  id: "01a06895-1cfe-7000-918a-9e999d062e47",
  pageTypeSlug: "module",
  slug: "markdown-refusal-text",
  definition: "a refusal's words, read from its page and filled at every hole",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hole the body marks and no value fills refuses rather than printing the brace.",
    },
    {
      invariantKind: "departure",
      statement: "A value handed over that the body marks no hole for refuses.",
    },
  ],
} as const satisfies Module
