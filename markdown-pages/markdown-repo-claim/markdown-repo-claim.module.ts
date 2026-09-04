import type { Module } from "@akasha/code-system/module"

export const markdownRepoClaim = {
  id: "01a06895-1cf4-7000-b29d-dd01b048bf67",
  pageTypeSlug: "module",
  slug: "markdown-repo-claim",
  definition: "the repository a stated path claims, cut at the first colon",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stated path claiming no repository stands in the instructions checkout.",
    },
  ],
} as const satisfies Module
