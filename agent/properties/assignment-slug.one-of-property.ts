import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const assignmentSlug = {
  id: "01a053a2-d0e7-7948-a966-74efed3c62f0",
  type: "page-type/one-of-property",
  slug: "assignment-slug",
  propertySlug: "assignment-slug",
  definition: "the domain, initiative or game whose work a seat answers to",
  members: [
    "relation-property/page-domain",
    "relation-property/initiative",
    "relation-property/assignment-game",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment naming no page type is looked for under every member.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person and a persona each extend a domain.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No member of this property admits plain text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A misspelled assignment is refused rather than kept as text.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A subagent may name an assignment that is no page.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
