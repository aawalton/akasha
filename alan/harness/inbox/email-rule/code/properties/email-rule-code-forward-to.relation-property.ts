import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const emailRuleCodeForwardTo = {
  id: "01a06860-54a0-7c31-a1ec-4d13559b970a",
  type: "page-type/relation-property",
  slug: "email-rule-code-forward-to",
  propertySlug: "forward-to",
  definition: "the person each email that matches an email rule is sent to",
  targetPageType: "page-type/person",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Forwarding names a person rather than an address.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:45:38.720Z",
  updatedAt: "2026-10-30T15:41:19.241Z",
} as const satisfies RelationProperty
