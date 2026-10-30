import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const whatTried = {
  id: "01a0685d-b81f-7f8e-8a19-41a2bcc1be19",
  type: "page-type/file-property",
  slug: "what-tried",
  propertySlug: "what-tried",
  definition: "the things Alan wears in an appearance experiment",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This file has the garments themselves rather than how those garments came out.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:42:47.583Z",
  updatedAt: "2026-10-30T16:31:27.713Z",
} as const satisfies FileProperty
