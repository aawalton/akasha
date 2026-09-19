import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const contributorEmailHash = {
  id: "01a0ba90-7481-7416-9833-84de20e54722",
  type: "page-type/text-property",
  slug: "contributor-email-hash",
  propertySlug: "email-hash",
  definition: "the sha-256 of the address a contributor pays under, written as lower hex",
  maxLength: 64,
  nameFormat: null,
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The address a contributor pays under exists nowhere here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payment reaches a contributor by hashing the address Stripe reports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is lowercased before hashing and changed no other way.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
