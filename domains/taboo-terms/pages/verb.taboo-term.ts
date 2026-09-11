import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const verb = {
  id: "01a0593e-da42-7dfa-8095-c94687e5ffae",
  type: "taboo-term",
  slug: "verb",
  pattern: "(?<!\\.)\\bverb\\b(?!:)",
  tabooSenses: [{ sense: "an `ops` subcommand", instead: "command" }],
} as const satisfies TabooTerm
