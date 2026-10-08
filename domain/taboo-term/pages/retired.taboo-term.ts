import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const retired = {
  id: "01a0593e-da3a-78b1-b825-2a2926c225fc",
  type: "page-type/taboo-term",
  slug: "retired",
  pattern: "\\bretired\\b",
  tabooSenses: [
    { sense: "a seat ended so that nothing could be returned to it", instead: "stopped" },
  ],
  createdAt: "2026-08-31T19:14:46.458Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
