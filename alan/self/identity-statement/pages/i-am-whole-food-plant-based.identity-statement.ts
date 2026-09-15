import type { IdentityStatement } from "akasha/alan/self/identity-statement/identity-statement.page-type.types.ts"

export const iAmWholeFoodPlantBased = {
  id: "019ea810-a37e-7a29-b31e-004f0245a7bd",
  type: "page-type/identity-statement",
  slug: "i-am-whole-food-plant-based",
  title: "I am whole food plant-based",
  about: "myself",
  identityStatementLevel: 0.6,
  notionId: "2d95cf0bf24a805094dcef901861bae1",
  identityStatementRank: "a-rank",
  replacesStatements: ["identity-statement/i-eat-whatever-is-easiest"],
  identityStatementStatus: "in-progress",
  subStatements: [
    "identity-statement/i-like-plants",
    "identity-statement/i-dont-like-sugar",
    "identity-statement/i-dont-like-processed-foods",
    "identity-statement/i-dont-like-meat",
    "identity-statement/i-dont-mind-dairy",
  ],
  identityStatementTags: ["eat"],
  identityStatementValue: "value/health",
  icon: "file-text",
} as const satisfies IdentityStatement
