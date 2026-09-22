import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const standardAgentEnglishNonTerm = {
  id: "01a07c78-2ba0-77ce-8ff3-02364664537f",
  type: "page-type/domain",
  slug: "standard-agent-english-non-term",
  definition: "a thing akasha writes that is no term",
  parts: ["page-type/standard-agent-english-non-term-kind"],
} as const satisfies Domain
