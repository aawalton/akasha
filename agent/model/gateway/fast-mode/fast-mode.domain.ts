import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const fastMode = {
  id: "01a15594-08ee-76c6-b5a1-7c49fafb04b8",
  type: "page-type/domain",
  slug: "fast-mode",
  definition: "how Anthropic runs a model faster",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "fast mode" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Fast mode costs more than a model run at its usual speed.",
    },
  ],
  createdAt: "2026-10-19T19:12:07.405Z",
  updatedAt: "2026-10-19T19:23:07.228Z",
} as const satisfies Domain
