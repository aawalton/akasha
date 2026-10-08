import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeRunning = {
  id: "01a09b28-b8af-7f7c-804c-05aff06380bf",
  type: "page-type/domain",
  slug: "code-running",
  definition: "how a program is run over a file",
  parts: [
    "module/code-format",
    "module/code-lint",
    "module/code-tests",
    "module/test-overlay",
    "module/test-environment",
    "module/test-confinement",
  ],
  createdAt: "2026-09-13T14:25:32.335Z",
  updatedAt: "2026-09-25T17:24:47.000Z",
} as const satisfies Domain
