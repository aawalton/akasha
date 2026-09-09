import type { FileProperty } from "@akasha/pages/file-property"

export type WhatTried = "txt"

export const whatTried = {
  id: "01a0685d-b81f-7f8e-8a19-41a2bcc1be19",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "what-tried",
  propertySlug: "what-tried",
  definition: "the thing put on and what it was put on with",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file has the garments themselves rather than how those garments came out.",
    },
  ],
} as const satisfies FileProperty
