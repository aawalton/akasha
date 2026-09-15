import type { IdentityStatement } from "akasha/alan/self/identity-statement/identity-statement.page-type.types.ts"

export const iAmSociallyIsolated = {
  id: "019ea810-aef2-7f07-9d0d-ac0226b92f1d",
  type: "page-type/identity-statement",
  slug: "i-am-socially-isolated",
  title: "I am socially isolated",
  about: "myself",
  identityStatementLevel: 1,
  notionId: "8ee648feab03446a9031429648ad6c6c",
  identityStatementRank: "d-rank",
  replacedByStatements: ["identity-statement/i-am-deeply-connected"],
  identityStatementStatus: "current",
  identityStatementValue: "value/love",
  icon: "file-text",
} as const satisfies IdentityStatement
