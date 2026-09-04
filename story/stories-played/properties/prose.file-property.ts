import type { FileProperty } from "@akasha/pages-system/file-property"

export type Prose = "txt"

export const prose = {
  id: "01a06424-329c-73d2-a881-67d728085a28",
  pageTypeSlug: "file-property",
  slug: "prose",
  propertySlug: "prose",
  definition: "the text a page carries, however long the text runs",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Prose is held in a file beside its page rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose text would outrun a description carries the text here.",
    },
  ],
} as const satisfies FileProperty
