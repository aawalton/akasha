import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const codeSystem = {
  id: "01a04a26-9105-7002-aa57-d2c5a03907ce",
  pageTypeSlug: "domain",
  slug: "code-system",
  definition: "how we write what runs",
  partSlugs: [
    "page-type/module",
    "page-type/ios-app",
    "page-type/ios-component",
    "page-type/ios-harness",
    "page-type/shell-script",
    "module/body-text",
    "module/code-specifier",
    "module/code-rule",
    "module/code-source",
    "module/code-tests",
    "module/code-format",
    "module/code-lint",
  ],
} as const satisfies Domain
