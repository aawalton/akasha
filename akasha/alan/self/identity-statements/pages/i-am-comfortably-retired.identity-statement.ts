import type { IdentityStatement } from "../identity-statement.page-type.ts"

export const iAmComfortablyRetired = {
  id: "019ea810-ad04-7400-899d-55b1bcc17a75",
  pageTypeSlug: "identity-statement",
  slug: "i-am-comfortably-retired",
  title: "I am comfortably retired",
  about: "myself",
  identityStatementLevel: 1,
  notionId: "85f12564cfaf4f959bc95071e07aa50e",
  identityStatementRank: "b-rank",
  replacedByStatementSlugs: ["i-am-independently-wealthy"],
  identityStatementStatus: "current",
  identityStatementValueSlug: "wealth",
  icon: "file-text",
} as const satisfies IdentityStatement
