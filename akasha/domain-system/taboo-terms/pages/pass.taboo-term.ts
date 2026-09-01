import type { TabooTerm } from "../taboo-term.page-type.ts"

export const pass = {
  id: "01a0593e-da32-7d50-9393-19dee6f5ef0d",
  pageTypeSlug: "taboo-term",
  slug: "pass",
  pattern: '(?<!\\d )\\bpass\\b(?!")',
  tabooSenses: [{ sense: "one run of a task by one seat", instead: "run or reading" }],
} as const satisfies TabooTerm
