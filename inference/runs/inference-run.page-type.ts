import type { PageType } from "@akasha/pages/page-type"

export const inferenceRun = {
  id: "019ea7d8-5e16-7237-b2e0-4ce47633aa58",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "inference-run",
  definition: "one loading of a model to make something, and how it went",
  pluralSlug: "inference-runs",
  extends: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run is opened before the model starts and closed as completed or failed.",
    },
    {
      invariantKind: "departure",
      statement: "A run records where its output was written rather than the output itself.",
    },
  ],
  types: "ts",
} as const satisfies PageType
