import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export const inferenceRun = {
  id: "019ea7d8-5e16-7237-b2e0-4ce47633aa58",
  pageTypeSlug: "page-type",
  slug: "inference-run",
  definition: "one loading of a model to make something, and how it went",
  pluralSlug: "inference-runs",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run is opened before the model starts and closed as completed or failed.",
    },
    {
      invariantKind: "departure",
      statement: "A run records where its output was written, never the output itself.",
    },
  ],
} as const satisfies PageType

export type InferenceRun = Page
