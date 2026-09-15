import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const generationImages = {
  id: "01a0685d-b81f-7a4b-bdfb-f1daf8fbfda4",
  type: "page-type/file-property",
  slug: "generation-images",
  propertySlug: "images",
  definition: "every picture the runs in this log have made",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One row is one json object on one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image row records where its bytes are rather than the bytes.",
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
