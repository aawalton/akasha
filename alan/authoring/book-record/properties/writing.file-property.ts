import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const writing = {
  id: "01a0657d-b91d-7400-8d2e-61275a1db1c9",
  type: "page-type/file-property",
  slug: "writing",
  propertySlug: "writing",
  definition: "the markdown a page carries, however long the markdown runs",
  extensions: ["md"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Writing is in a file beside its page rather than in the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A document is kept here as the markdown the document was written in.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
