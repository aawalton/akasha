import type { Module } from "@akasha/code-system/module"

export const markdownPageUnlanded = {
  id: "01a069b7-f95a-7147-be72-99ed084e0dfb",
  pageTypeSlug: "module",
  slug: "markdown-page-unlanded",
  definition: "every page a writer handed the queue that the queue has not yet committed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is written and uncommitted is read from the journal rather than from git.",
    },
    {
      invariantKind: "departure",
      statement: "A landing is lost per writing process rather than per repository.",
    },
    {
      invariantKind: "departure",
      statement: "A writer no longer alive leaves its queued paths orphaned.",
    },
    {
      invariantKind: "departure",
      statement: "A repository named with no checkout here is refused rather than reported empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands a page or clears a journal.",
    },
  ],
} as const satisfies Module
