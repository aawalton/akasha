import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const watchable = {
  id: "01a18441-f370-7921-86aa-95c1d14963f3",
  type: "page-type/computed-property",
  slug: "watchable",
  propertySlug: "watchable",
  definition: "whether Alan can watch a collection's parts on a service he holds",
  holds: "boolean",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection is watchable where any service its parts stream on is held.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A free service does not make a collection watchable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose parts stream on no service is not watchable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a service is held is read off that service's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view narrows on this property as on any boolean.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T20:44:37.102Z",
  updatedAt: "2026-10-28T21:24:32.573Z",
} as const satisfies ComputedProperty
