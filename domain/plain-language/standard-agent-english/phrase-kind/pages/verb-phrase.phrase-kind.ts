import type { PhraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.types.ts"

export const verbPhrase = {
  id: "01a0c9a2-b28c-7a58-8b45-8cf905e5149c",
  type: "page-type/phrase-kind",
  slug: "verb-phrase",
  definition: "what a clause says is done",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A verb phrase is one word, or a form of be with a participle after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A construction naming what a clause does names this rather than one part of speech.",
    },
  ],
  createdAt: "2026-09-22T15:01:18.092Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies PhraseKind
