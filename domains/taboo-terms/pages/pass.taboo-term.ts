import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const pass = {
  id: "01a0593e-da32-7d50-9393-19dee6f5ef0d",
  type: "taboo-term",
  slug: "pass",
  pattern: '(?<!\\d )\\bpass\\b(?!")',
  tabooSenses: [{ sense: "one run of a task by one seat", instead: "run or reading" }],
} as const satisfies TabooTerm
