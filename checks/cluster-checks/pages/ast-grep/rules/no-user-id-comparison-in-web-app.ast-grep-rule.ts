import type { AstGrepRule } from "../../../../ast-grep-rules/ast-grep-rule.page-type.ts"

export const noUserIdComparisonInWebApp = {
  id: "01a08196-4bd7-7d34-a71d-ff5f276ee169",
  pageTypeSlug: "ast-grep-rule",
  slug: "no-user-id-comparison-in-web-app",
  definition: "the rule refusing a web app deciding who it serves from a compiled-in user id",
  rule: "yml",
} as const satisfies AstGrepRule
