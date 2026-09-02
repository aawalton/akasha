import type { FileProperty } from "@akasha/pages-system/file-property"

export type Data = "txt"

export const data = {
  id: "01a05fcb-fd2e-7a31-a6cd-4ca9b25009e7",
  pageTypeSlug: "file-property",
  slug: "data",
  propertySlug: "data",
  definition: "one slice of the JSON a reading of an inventory was written as",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slice is cut on a byte count rather than on a JSON boundary.",
    },
    {
      invariantKind: "departure",
      statement: "A single slice is not JSON.",
    },
  ],
} as const satisfies FileProperty
