import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const assignmentSlug = {
  id: "01a053a2-d0e7-7948-a966-74efed3c62f0",
  type: "page-type/one-of-property",
  slug: "assignment-slug",
  propertySlug: "assignment-slug",
  definition: "the page a seat works for",
  members: [
    "relation-property/page-domain",
    "relation-property/initiative",
    "relation-property/assignment-game",
    "relation-property/assignment-world",
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
  createdAt: "2026-08-30T17:06:14.375Z",
  updatedAt: "2026-10-19T19:37:40.847Z",
} as const satisfies OneOfProperty
