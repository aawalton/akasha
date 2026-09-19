import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const deviceSecretContributor = {
  id: "01a0bb8b-035d-7000-b57a-e7b33e0f3722",
  type: "page-type/relation-property",
  slug: "device-secret-contributor",
  propertySlug: "contributor",
  definition: "the contributor a device secret was minted for",
  targetPageType: "page-type/contributor",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A device secret minted under a session names the contributor that session is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device secret names a contributor or an account, and never both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device secret naming a contributor states no account.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
