import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const colour = {
  id: "01a0593e-da22-7d97-b8b0-c56d8dd46dfb",
  type: "page-type/taboo-term",
  slug: "colour",
  pattern: "\\bcolour\\b",
  tabooSenses: [{ sense: "a color, spelled the British way", instead: "color" }],
  createdAt: "2026-08-31T19:14:46.434Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
