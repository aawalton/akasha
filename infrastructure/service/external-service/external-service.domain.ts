import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const externalService = {
  id: "01a0d49d-d0ee-715a-a8ef-3047892f6f67",
  type: "page-type/domain",
  slug: "external-service",
  definition: "a service that is not part of akasha",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "external service" },
    { partOfSpeech: "part-of-speech/noun", spelling: "external services" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An external service is no akasha service, since no deploy of akasha puts it up.",
    },
  ],
  createdAt: "2026-09-24T18:11:47.566Z",
  updatedAt: "2026-09-25T17:05:59.000Z",
} as const satisfies Domain
