import type { BannedTerm } from "akasha/domain/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const systemAkasha = {
  id: "01a0c983-fd53-76c7-a1e9-8f5b9c3655e0",
  type: "page-type/banned-term",
  slug: "system-akasha",
  spelling: "system",
  definition: "the whole of what Alan built, which akasha names",
  instead: "akasha",
} as const satisfies BannedTerm
