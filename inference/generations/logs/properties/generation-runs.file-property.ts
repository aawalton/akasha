import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type GenerationRuns = "jsonl"

export const generationRuns = {
  id: "01a0685d-b81f-733c-884c-2ad8e70c0c6f",
  pageTypeSlug: "file-property",
  type: "file-property",
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
      statement: "A run records where its output was written rather than the output itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "Rows past the most bytes one file may have roll into a numbered part beside that file.",
    },
    {
      invariantKind: "departure",
      statement: "The first part beside a page is part2.",
    },
    {
      invariantKind: "departure",
      statement: "Each further part takes the next number up.",
    },
  ],
} as const satisfies FileProperty
