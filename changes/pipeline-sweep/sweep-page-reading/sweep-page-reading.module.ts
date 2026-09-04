import type { Module } from "@akasha/code-system/module"

export const sweepPageReading = {
  id: "01a068d9-1a58-79f5-8864-62344f5cdab5",
  pageTypeSlug: "module",
  slug: "sweep-page-reading",
  definition: "every unfinished pipeline, workflow and step read in one pass",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page is read from the checkout standing on the workstation rather than over a network.",
    },
    {
      invariantKind: "departure",
      statement: "A query names every key the reading takes.",
    },
    {
      invariantKind: "gap",
      statement: "A step's definition is still read from the markdown sidecar beside its page.",
    },
    {
      invariantKind: "gap",
      statement: "A step whose definition goes unread stands as having none rather than refusing.",
    },
  ],
} as const satisfies Module
