import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const deploysAfter = {
  id: "01a09575-f21d-7413-814c-80ef1a0b4ba9",
  type: "relation-property",
  slug: "deploys-after",
  propertySlug: "deploys-after",
  definition: "a service this one is never deployed ahead of",
  targetPageType: "page-type/service",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A service names another here only where being deployed past that one's commit would break.",
    },
    {
      invariantKind: "departure",
      statement: "Two services that reach each other and bear the skew name each other by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "This edge is a version one service holds another to rather than a reach.",
    },
    {
      invariantKind: "departure",
      statement: "A service naming one still wanting a deploy is held back until that one has it.",
    },
    {
      invariantKind: "departure",
      statement: "A service a person deploys by hand is held back by nothing here.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
