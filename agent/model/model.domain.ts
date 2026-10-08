import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const model = {
  id: "01a0535c-f2cf-7edc-8a2e-f495d1255183",
  type: "page-type/domain",
  slug: "model",
  definition: "how an agent chooses the next words",

  parts: [
    "domain/model-gateway",
    "module/model-answer",
    "module/model-asking",
    "module/model-vocab",
    "page-type/model-account",
    "page-type/model-family",
    "page-type/model-provider",
    "page-type/model-test",
    "page-type/model-version",
  ],
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "model" },
    { partOfSpeech: "part-of-speech/noun", spelling: "models" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A model is a domain whose subject is one trained network.",
    },
  ],
  createdAt: "2026-08-30T15:49:55.535Z",
  updatedAt: "2026-09-24T18:40:50.000Z",
} as const satisfies Domain
