import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const codeSystem = {
  id: "01a04a26-9105-7002-aa57-d2c5a03907ce",
  pageTypeSlug: "domain",
  slug: "code-system",
  definition: "how we write what runs",
  partSlugs: [
    "page-type/module",
    "module/code-lint",
    "module/code-rule",
    "module/code-specifier",
    "module/code-tests",
  ],
} as const satisfies Domain
