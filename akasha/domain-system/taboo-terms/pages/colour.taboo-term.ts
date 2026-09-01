import type { TabooTerm } from "../taboo-term.page-type.ts"

export const colour = {
  id: "01a0593e-da22-7d97-b8b0-c56d8dd46dfb",
  pageTypeSlug: "taboo-term",
  slug: "colour",
  pattern: "\\bcolour\\b",
  tabooSenses: [{ sense: "a color, spelled the British way", instead: "color" }],
} as const satisfies TabooTerm
