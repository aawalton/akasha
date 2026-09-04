import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const mainPipeline = {
  id: "01a0675b-16ef-7597-80d8-fade845b987a",
  pageTypeSlug: "domain",
  slug: "main-pipeline",
  definition: "the pipeline each commit on main runs, and where a deploy happens",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A burst of requests mints one pipeline, at the newest of them.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reconciler finding a main commit no pipeline covers reports the drift and writes nothing.",
    },
  ],
} as const satisfies Domain
