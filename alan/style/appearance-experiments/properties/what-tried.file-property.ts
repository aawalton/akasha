import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const whatTried = {
  id: "01a0685d-b81f-7f8e-8a19-41a2bcc1be19",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "what-tried",
  propertySlug: "what-tried",
  definition: "the thing put on and what it was put on with",
  extensions: ["txt"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file has the garments themselves rather than how those garments came out.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
