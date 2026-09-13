import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const codeReading = {
  id: "01a09b3a-9daa-7aac-8778-f72dbc1e9b71",
  type: "domain",
  slug: "code-reading",
  definition: "a body read as TypeScript, and what that reading says its spellings mean",
  parts: [
    "module/code-naming",
    "module/code-rule",
    "module/code-source",
    "module/code-specifier",
    "module/code-tokens",
    "module/code-typing",
    "module/typing-keeping",
    "module/value-inserting",
  ],
} as const satisfies Domain
