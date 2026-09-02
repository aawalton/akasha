import type { Module } from "@akasha/code-system/module"

export const watcherRunStatus = {
  id: "01a0640f-8510-71f3-afa2-898d69327ed2",
  pageTypeSlug: "module",
  slug: "watcher-run-status",
  definition: "one verdict over the operations the watcher reported from its last run",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry carrying no name is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The name is the key an operation is merged by.",
    },
    {
      invariantKind: "departure",
      statement: "A state this build does not know reads as no state rather than as a guess.",
    },
    {
      invariantKind: "departure",
      statement: "A missing file outranks a parse failure.",
    },
    {
      invariantKind: "departure",
      statement: "A parse failure outranks a failed upload.",
    },
    {
      invariantKind: "departure",
      statement: "A failed upload outranks a sync.",
    },
    {
      invariantKind: "departure",
      statement: "A run that attempted nothing confirms nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A summary carries the very operations that decided the verdict.",
    },
  ],
} as const satisfies Module
