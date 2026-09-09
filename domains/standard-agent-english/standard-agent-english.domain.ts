import type { Domain } from "../domain.page-type.ts"

export const standardAgentEnglish = {
  id: "01a07c58-7d63-7618-8189-1ea8ae48a1cb",
  pageTypeSlug: "domain",
  slug: "standard-agent-english",
  definition: "the language akasha is allowed to write in",
  parts: [
    "domain/standard-agent-english-term",
    "domain/standard-agent-english-non-term",
    "page-type/standard-agent-english-property",
    "module/term-census",
    "module/prose-pattern",
    "module/prose-reach",
    "page-type/prose-frame",
    "module/prose-rewrite",
    "module/prose-restating",
  ],
} as const satisfies Domain
