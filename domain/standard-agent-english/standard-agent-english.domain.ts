import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const standardAgentEnglish = {
  id: "01a07c58-7d63-7618-8189-1ea8ae48a1cb",
  type: "page-type/domain",
  slug: "standard-agent-english",
  definition: "akasha's allowed language",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Standard Agent English" }],
  parts: [
    "domain/prose",
    "module/prose-pattern",
    "module/prose-reach",
    "module/prose-restating",
    "module/prose-rewrite",
    "page-type/prose-frame",
    "page-type/standard-agent-english-property",
    "page-type/term",
    "page-type/part-of-speech",
    "page-type/phrase-kind",
    "page-type/construction",
    "module/phrase-parsing",
  ],
} as const satisfies Domain
