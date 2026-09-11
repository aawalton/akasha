import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const emailRuleCodeForwardTo = {
  id: "01a06860-54a0-7c31-a1ec-4d13559b970a",
  type: "relation-property",
  slug: "email-rule-code-forward-to",
  propertySlug: "forward-to",
  definition: "who a piece of mail the rule matches is forwarded to",
  targetPageType: "page-type/person",
  invariants: [
    { invariantKind: "departure", statement: "Forwarding names a person rather than an address." },
  ],
  types: "ts",
} as const satisfies RelationProperty
