import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const emailRuleCodeForwardTo = {
  id: "01a06860-54a0-7c31-a1ec-4d13559b970a",
  type: "page-type/relation-property",
  slug: "email-rule-code-forward-to",
  propertySlug: "forward-to",
  definition: "who a piece of mail the rule matches is forwarded to",
  targetPageType: "page-type/person",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Forwarding names a person rather than an address.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:45:38.720Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
