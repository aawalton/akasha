import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeReading = {
  id: "01a09b3a-9daa-7aac-8778-f72dbc1e9b71",
  type: "page-type/domain",
  slug: "code-reading",
  definition: "how code reads TypeScript",
  parts: [
    "module/code-importing",
    "module/code-naming",
    "module/code-rule",
    "module/code-source",
    "module/code-specifier",
    "module/code-typing",
    "module/typing-keeping",
    "module/value-inserting",
    "module/code-binding",
    "module/ast-hash",
  ],
  createdAt: "2026-09-13T14:45:05.066Z",
  updatedAt: "2026-09-25T14:12:28.000Z",
} as const satisfies Domain
