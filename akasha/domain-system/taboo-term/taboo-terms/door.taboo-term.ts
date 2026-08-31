import type { TabooTerm } from "../taboo-term.page-type.ts"

export const door = {
  id: "01a0593e-da26-7979-800e-80ad31ba2c64",
  pageTypeSlug: "taboo-term",
  slug: "door",
  pattern: "\\bdoor\\b",
  tabooSenses: [
    { sense: "a gated command", instead: "command" },
    { sense: "anything that refuses", instead: "written plainly" },
  ],
} as const satisfies TabooTerm
