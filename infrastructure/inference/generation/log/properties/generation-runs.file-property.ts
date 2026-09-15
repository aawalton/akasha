import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const generationRuns = {
  id: "01a0685d-b81f-733c-884c-2ad8e70c0c6f",
  type: "page-type/file-property",
  slug: "generation-runs",
  propertySlug: "runs",
  definition: "every loading of a model this log has recorded",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One row is one json object on one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run records where its output was written rather than the output itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Rows past the most bytes one file may have roll into a numbered part beside that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first part beside a page is part2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each further part takes the next number up.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
