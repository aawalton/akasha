import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type EmailRuleCodeForwardToSlug = Slug

export const emailRuleCodeForwardToSlug = {
  id: "01a06860-54a0-7c31-a1ec-4d13559b970a",
  pageTypeSlug: "relation-property",
  slug: "email-rule-code-forward-to-slug",
  propertySlug: "forward-to-slug",
  definition: "who a piece of mail the rule matches is forwarded to",
  targetPageTypeSlug: "page-type/person",
  invariants: [
    { invariantKind: "departure", statement: "Forwarding names a person rather than an address." },
  ],
} as const satisfies RelationProperty
