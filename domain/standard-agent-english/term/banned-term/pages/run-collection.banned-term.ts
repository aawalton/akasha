import type { BannedTerm } from "akasha/domain/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const runCollection = {
  id: "01a0c93a-fdec-71aa-9613-a058b1bde88a",
  type: "page-type/banned-term",
  slug: "run-collection",
  spelling: "run",
  definition: "a group of things gathered together rather than a program taken end to end",
  instead: "set",
} as const satisfies BannedTerm
