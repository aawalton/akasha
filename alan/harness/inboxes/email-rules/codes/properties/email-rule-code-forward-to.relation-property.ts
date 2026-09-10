import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type EmailRuleCodeForwardTo = Slug

export const emailRuleCodeForwardTo = {
  id: "01a06860-54a0-7c31-a1ec-4d13559b970a",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "email-rule-code-forward-to",
  propertySlug: "forward-to",
  definition: "who a piece of mail the rule matches is forwarded to",
  targetPageType: "page-type/person",
  invariants: [
    { invariantKind: "departure", statement: "Forwarding names a person rather than an address." },
  ],
} as const satisfies RelationProperty
