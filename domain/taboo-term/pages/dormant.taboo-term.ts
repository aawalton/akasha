import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const dormant = {
  id: "01a0593e-da27-7ae9-8964-6de3e8fa78e8",
  type: "page-type/taboo-term",
  slug: "dormant",
  pattern: "\\bdormant\\b",
  tabooSenses: [
    { sense: "a seat with no process in it that a message would bring back", instead: "absent" },
  ],
  createdAt: "2026-08-31T19:14:46.439Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
