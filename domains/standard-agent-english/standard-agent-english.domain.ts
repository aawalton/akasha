import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const standardAgentEnglish = {
  id: "01a07c58-7d63-7618-8189-1ea8ae48a1cb",
  type: "domain",
  slug: "standard-agent-english",
  definition: "the language akasha is allowed to write in",
  parts: [
    "domain/standard-agent-english-non-term",
    "domain/term",
    "module/prose-pattern",
    "module/prose-reach",
    "module/prose-restating",
    "module/prose-rewrite",
    "module/term-census",
    "page-type/prose-frame",
    "page-type/standard-agent-english-property",
  ],
} as const satisfies Domain
