import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const verb = {
  id: "01a0593e-da42-7dfa-8095-c94687e5ffae",
  type: "page-type/taboo-term",
  slug: "verb",
  pattern: "(?<!\\.)\\bverb\\b(?!:)",
  tabooSenses: [{ sense: "an `ops` subcommand", instead: "command" }],
  createdAt: "2026-08-31T19:14:46.466Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
