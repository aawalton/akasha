import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const door = {
  id: "01a0593e-da26-7979-800e-80ad31ba2c64",
  type: "page-type/taboo-term",
  slug: "door",
  pattern: "\\bdoor\\b",
  tabooSenses: [
    { sense: "a gated command", instead: "command" },
    { sense: "anything that refuses", instead: "written plainly" },
  ],
  createdAt: "2026-08-31T19:14:46.438Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
