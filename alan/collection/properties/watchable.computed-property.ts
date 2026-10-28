import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const watchable = {
  id: "01a18441-f370-7921-86aa-95c1d14963f3",
  type: "page-type/computed-property",
  slug: "watchable",
  propertySlug: "watchable",
  definition: "whether Alan can watch what is left of a collection on a service he holds",
  holds: "boolean",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A collection is watchable where a show or movie under it is unfinished and on a held service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completed show or movie adds nothing, even on a held service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show or movie counts its own services while it is not completed.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A service is stated per show or movie, so a show's seasons are never told apart.",
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
  updatedAt: "2026-10-28T21:43:25.354Z",
} as const satisfies ComputedProperty
