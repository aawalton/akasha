import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const runFollows = {
  id: "01a0c952-37a9-726d-a83b-35d226fe3eab",
  type: "page-type/text-property",
  slug: "run-follows",
  propertySlug: "follows",
  definition: "the hash of the run a run comes after",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hash is taken over the whole of the run before, as that run was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first run of a game states nothing here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
