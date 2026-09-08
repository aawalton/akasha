import type { AstGrepRule } from "../../../../ast-grep-rules/ast-grep-rule.page-type.ts"

export const noHardcodedAstGrepScan = {
  id: "01a08195-53a5-7a6f-85bf-d4ddeaf5e78a",
  pageTypeSlug: "ast-grep-rule",
  slug: "no-hardcoded-ast-grep-scan",
  definition: "the rule refusing a check that launches the scanner itself",
  rule: "yml",
} as const satisfies AstGrepRule
