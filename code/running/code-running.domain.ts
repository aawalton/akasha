import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeRunning = {
  id: "01a09b28-b8af-7f7c-804c-05aff06380bf",
  type: "domain",
  slug: "code-running",
  definition: "putting this repository's own tools over a body and reading back what they said",
  parts: ["module/code-format", "module/code-lint", "module/code-tests", "module/test-overlay"],
} as const satisfies Domain
