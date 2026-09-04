import type { FileProperty } from "@akasha/pages-system/file-property"

export type GenerationRuns = "jsonl"

export const generationRuns = {
  id: "01a0685d-b81f-733c-884c-2ad8e70c0c6f",
  pageTypeSlug: "file-property",
  slug: "generation-runs",
  propertySlug: "runs",
  definition: "every loading of a model this log has recorded",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
    {
      invariantKind: "departure",
      statement: "A run records where its output was written, never the output itself.",
    },
  ],
} as const satisfies FileProperty
