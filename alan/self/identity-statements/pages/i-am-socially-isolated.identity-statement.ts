import type { IdentityStatement } from "../identity-statement.page-type.ts"

export const iAmSociallyIsolated = {
  id: "019ea810-aef2-7f07-9d0d-ac0226b92f1d",
  pageTypeSlug: "identity-statement",
  slug: "i-am-socially-isolated",
  title: "I am socially isolated",
  about: "myself",
  identityStatementLevel: 1,
  notionId: "8ee648feab03446a9031429648ad6c6c",
  identityStatementRank: "d-rank",
  replacedByStatementSlugs: ["i-am-deeply-connected"],
  identityStatementStatus: "current",
  identityStatementValueSlug: "love",
  icon: "file-text",
} as const satisfies IdentityStatement
