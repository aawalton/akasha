import type { FileProperty } from "@akasha/pages-system/file-property"

export type GenerationImages = "jsonl"

export const generationImages = {
  id: "01a0685d-b81f-7a4b-bdfb-f1daf8fbfda4",
  pageTypeSlug: "file-property",
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
      statement: "An image row records where its bytes stand, never the bytes.",
    },
  ],
} as const satisfies FileProperty
