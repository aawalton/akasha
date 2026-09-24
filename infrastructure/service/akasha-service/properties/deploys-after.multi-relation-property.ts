import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const deploysAfter = {
  id: "01a09575-f21d-7413-814c-80ef1a0b4ba9",
  type: "page-type/multi-relation-property",
  slug: "deploys-after",
  propertySlug: "deploys-after",
  definition: "a service deployed ahead of this one",
  targetPageType: "page-type/akasha-service",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service names another here only where being deployed past that one's commit would break.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two services that reach each other and bear the skew name each other by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This edge is a version one service holds another to rather than a reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service naming one still wanting a deploy is held back until that one has it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service a person deploys by hand is held back by nothing here.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
