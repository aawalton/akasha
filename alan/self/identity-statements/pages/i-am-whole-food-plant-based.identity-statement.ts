import type { IdentityStatement } from "../identity-statement.page-type.ts"

export const iAmWholeFoodPlantBased = {
  id: "019ea810-a37e-7a29-b31e-004f0245a7bd",
  pageTypeSlug: "identity-statement",
  slug: "i-am-whole-food-plant-based",
  title: "I am whole food plant-based",
  about: "myself",
  identityStatementLevel: 0.6,
  notionId: "2d95cf0bf24a805094dcef901861bae1",
  identityStatementRank: "a-rank",
  replacesStatementSlugs: ["i-eat-whatever-is-easiest"],
  identityStatementStatus: "in-progress",
  subStatementSlugs: [
    "i-like-plants",
    "i-dont-like-sugar",
    "i-dont-like-processed-foods",
    "i-dont-like-meat",
    "i-dont-mind-dairy",
  ],
  identityStatementTags: ["eat"],
  identityStatementValueSlug: "health",
  icon: "file-text",
} as const satisfies IdentityStatement
