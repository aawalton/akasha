import type { Module } from "@akasha/code-system/module"

export const ciStatusVocabulary = {
  id: "01a0685e-023f-7001-8243-af6feb95212a",
  pageTypeSlug: "module",
  slug: "ci-status-vocabulary",
  definition:
    "every status a pipeline, a workflow, a step, a merge queue entry and a merge queue batch stand in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A status this vocabulary does not name is no status.",
    },
    {
      invariantKind: "departure",
      statement:
        "The non-terminal statuses are what is left once the terminal ones are taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline holds no launching status, and only a step does.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline is never blocked and never skipped, and a workflow and a step may be.",
    },
  ],
} as const satisfies Module
