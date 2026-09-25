import type { BannedTerm } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const oneSingle = {
  id: "01a0c685-4628-71a3-8d01-5445ae47de43",
  type: "page-type/banned-term",
  slug: "one-single",
  spelling: "one",
  definition: "a single thing, where no count is set against another count",
  instead: "a",
} as const satisfies BannedTerm
