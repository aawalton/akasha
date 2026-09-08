import type { AstGrepRule } from "../../../../ast-grep-rules/ast-grep-rule.page-type.ts"

export const mockModuleOutsideTestFile = {
  id: "01a08193-855a-740f-a4a8-edd56a630052",
  pageTypeSlug: "ast-grep-rule",
  slug: "mock-module-outside-test-file",
  definition: "the rule refusing a mock.module call outside a test file",
  rule: "yml",
} as const satisfies AstGrepRule
