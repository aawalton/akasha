import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type GenerationImages = "jsonl"

export const generationImages = {
  id: "01a0685d-b81f-7a4b-bdfb-f1daf8fbfda4",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "generation-images",
  propertySlug: "images",
  definition: "every picture the runs in this log have made",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
    {
      invariantKind: "departure",
      statement: "An image row records where its bytes are rather than the bytes.",
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
