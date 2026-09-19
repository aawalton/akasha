import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const personContributor = {
  id: "01a0bb36-56fc-7f8a-9518-9365e9db5dac",
  type: "page-type/relation-property",
  slug: "person-contributor",
  propertySlug: "contributor",
  definition: "the contributor a person signs in as",
  targetPageType: "page-type/contributor",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person signing in nowhere names no contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Most people name no contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person is one contributor, and a contributor is at most one person.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
