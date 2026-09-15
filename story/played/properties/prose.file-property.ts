import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const prose = {
  id: "01a06424-329c-73d2-a881-67d728085a28",
  type: "file-property",
  slug: "prose",
  propertySlug: "prose",
  definition: "the text a page carries, however long the text runs",
  extensions: ["txt"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Prose is in a file beside its page rather than in the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose text would outrun a description has the text here.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
