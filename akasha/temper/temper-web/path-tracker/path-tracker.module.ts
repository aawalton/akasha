import type { Module } from "@akasha/code-system/module"

export const pathTracker = {
  id: "01a06432-b190-71fc-9819-f71d76c95c14",
  pageTypeSlug: "module",
  slug: "path-tracker",
  definition: "the last page a reader was on, kept so signing in returns them to it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An auth page is not kept as the page a reader was last on.",
    },
    {
      invariantKind: "departure",
      statement: "What tracks the path is a hook rather than a component.",
    },
  ],
} as const satisfies Module
