import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const writing = {
  id: "01a0657d-b91d-7400-8d2e-61275a1db1c9",
  type: "page-type/file-property",
  slug: "writing",
  propertySlug: "writing",
  definition: "the markdown a page carries, however long the markdown runs",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing is in a file beside its page rather than in the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A document is kept here as the markdown the document was written in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:18:53.341Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies FileProperty
