import type { BannedTerm } from "akasha/domain/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const gatheredVague = {
  id: "01a0c976-e0de-7659-88b3-f7f7320cc4b5",
  type: "page-type/banned-term",
  slug: "gathered-vague",
  spelling: "gathered",
  definition: "bringing things together, where putting, taking or filing says which plainer",
  instead: "put",
} as const satisfies BannedTerm
