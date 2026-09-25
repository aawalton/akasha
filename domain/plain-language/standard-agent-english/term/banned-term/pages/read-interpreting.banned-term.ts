import type { BannedTerm } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const readInterpreting = {
  id: "01a0c941-6930-7ac7-a80f-b354c589f041",
  type: "page-type/banned-term",
  slug: "read-interpreting",
  spelling: "read",
  definition: "taking a thing to mean something rather than taking in what is written",
  instead: "taken as",
} as const satisfies BannedTerm
