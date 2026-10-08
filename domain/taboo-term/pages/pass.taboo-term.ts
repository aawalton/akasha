import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const pass = {
  id: "01a0593e-da32-7d50-9393-19dee6f5ef0d",
  type: "page-type/taboo-term",
  slug: "pass",
  pattern: '(?<!\\d )\\bpass\\b(?!")',
  tabooSenses: [{ sense: "one run of a task by one seat", instead: "run or reading" }],
  createdAt: "2026-08-31T19:14:46.450Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
