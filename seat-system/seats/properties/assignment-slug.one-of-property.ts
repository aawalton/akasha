import type { DomainSlug } from "@akasha/domains/domain-slug"
import type { InitiativeSlug } from "@akasha/domains/initiative-slug"
import type { OneOfProperty } from "@akasha/pages-system/one-of-property"

export type AssignmentSlug = DomainSlug | InitiativeSlug

export const assignmentSlug = {
  id: "01a053a2-d0e7-7948-a966-74efed3c62f0",
  pageTypeSlug: "one-of-property",
  slug: "assignment-slug",
  propertySlug: "assignment-slug",
  definition: "the domain or initiative whose work a seat answers to",
  memberSlugs: ["relation-property/domain-slug", "relation-property/initiative-slug"],
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
