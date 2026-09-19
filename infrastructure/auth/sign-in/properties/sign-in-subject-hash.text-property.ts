import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const signInSubjectHash = {
  id: "01a0baea-1b78-7dbf-b2bd-81ca4f6f3f8a",
  type: "page-type/text-property",
  slug: "sign-in-subject-hash",
  propertySlug: "subject-hash",
  definition: "the sha-256 of what a provider calls a person, written as lower hex",
  maxLength: 64,
  nameFormat: null,
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a provider calls a person is hashed rather than written down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every provider's name for a person hashes to one shape of name.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
