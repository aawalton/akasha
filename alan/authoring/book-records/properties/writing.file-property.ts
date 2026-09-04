import type { FileProperty } from "@akasha/pages-system/file-property"

export type Writing = "md"

export const writing = {
  id: "01a0657d-b91d-7400-8d2e-61275a1db1c9",
  pageTypeSlug: "file-property",
  slug: "writing",
  propertySlug: "writing",
  definition: "the markdown a page carries, however long the markdown runs",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Writing is held in a file beside its page rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement: "A document is kept here as the markdown the document was written in.",
    },
  ],
} as const satisfies FileProperty
