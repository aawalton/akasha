import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const prose = {
  id: "01a06424-329c-73d2-a881-67d728085a28",
  type: "page-type/file-property",
  slug: "prose",
  propertySlug: "prose",
  definition: "the text a page carries, however long the text runs",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose is in a file beside its page rather than in the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose text would outrun a description has the text here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T22:01:28.988Z",
  updatedAt: "2026-09-19T08:48:28.000Z",
} as const satisfies FileProperty
