import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const readLater = {
  id: "01a16426-5741-7168-ad64-d0db6cafde73",
  type: "page-type/boolean-property",
  slug: "read-later",
  propertySlug: "read-later",
  definition: "whether a person has put a story aside on the source's list for reading later",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story can be followed and put aside for later at once.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-22T15:06:36.737Z",
  updatedAt: "2026-10-22T15:06:36.737Z",
} as const satisfies BooleanProperty
