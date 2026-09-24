import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeReading = {
  id: "01a09b3a-9daa-7aac-8778-f72dbc1e9b71",
  type: "page-type/domain",
  slug: "code-reading",
  definition: "a body taken as TypeScript, and what its spellings mean once taken that way",
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
} as const satisfies Domain
