import type { FileProperty } from "@akasha/pages-system/file-property"

export type WhatTried = "txt"

export const whatTried = {
  id: "01a0685d-b81f-7f8e-8a19-41a2bcc1be19",
  pageTypeSlug: "file-property",
  slug: "what-tried",
  propertySlug: "what-tried",
  definition: "the thing put on and what it was put on with",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What was tried is the garments themselves rather than how they came out.",
    },
  ],
} as const satisfies FileProperty
