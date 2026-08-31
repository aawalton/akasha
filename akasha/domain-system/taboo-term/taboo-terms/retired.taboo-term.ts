import type { TabooTerm } from "../taboo-term.page-type.ts"

export const retired = {
  id: "01a0593e-da3a-78b1-b825-2a2926c225fc",
  pageTypeSlug: "taboo-term",
  slug: "retired",
  pattern: "\\bretired\\b",
  tabooSenses: [
    { sense: "a seat ended so that nothing could be returned to it", instead: "stopped" },
  ],
} as const satisfies TabooTerm
