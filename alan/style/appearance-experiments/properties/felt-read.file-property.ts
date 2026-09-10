import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type FeltRead = "txt"

export const feltRead = {
  id: "01a0685d-b81f-75fb-859d-dbff41d461c4",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "felt-read",
  propertySlug: "felt-read",
  definition: "how the try landed on Alan wearing it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A felt read is Alan's own rather than the persona's reading of Alan.",
    },
  ],
} as const satisfies FileProperty
