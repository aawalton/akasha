import type { OneOfProperty } from "@akasha/pages/one-of-property"
import type { Initiative } from "akasha/domains/initiatives/properties/initiative.relation-property.ts"
import type { PageDomain } from "akasha/domains/properties/page-domain.relation-property.ts"

export type AssignmentSlug = PageDomain | Initiative

export const assignmentSlug = {
  id: "01a053a2-d0e7-7948-a966-74efed3c62f0",
  pageTypeSlug: "one-of-property",
  type: "one-of-property",
  slug: "assignment-slug",
  propertySlug: "assignment-slug",
  definition: "the domain or initiative whose work a seat answers to",
  members: ["relation-property/page-domain", "relation-property/initiative"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An assignment naming no page type is looked for under both members.",
    },
    {
      invariantKind: "departure",
      statement: "A person and a persona each extend a domain.",
    },
    {
      invariantKind: "absence",
      statement: "No member of this property admits plain text.",
    },
    {
      invariantKind: "departure",
      statement: "A misspelled assignment is refused rather than kept as text.",
    },
    {
      invariantKind: "stopgap",
      statement: "A subagent may name an assignment that is no page.",
    },
  ],
} as const satisfies OneOfProperty
