import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const refusedCommit = {
  id: "01a09205-5959-7884-8c62-22e66c54cad9",
  type: "page-type/text-property",
  slug: "refused-commit",
  propertySlug: "refused-commit",
  definition: "the commit the last deploy that refused was made at",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit is the whole hash git resolved rather than the name a call gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that finished leaves the commit as that commit was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
