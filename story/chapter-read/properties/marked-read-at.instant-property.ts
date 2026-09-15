import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const markedReadAt = {
  id: "01a06860-cb0c-7346-bb65-3d5bb4069535",
  type: "page-type/instant-property",
  slug: "marked-read-at",
  propertySlug: "marked-read-at",
  definition: "when the source a collection was read from was told the collection had been read",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading a chapter here and telling the source so are two moments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose source was never told states no moment of telling.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
