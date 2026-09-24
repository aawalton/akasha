import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const externalService = {
  id: "01a0d49d-d0ee-715a-a8ef-3047892f6f67",
  type: "page-type/domain",
  slug: "external-service",
  definition: "a program run outside akasha",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "external service" },
    { partOfSpeech: "part-of-speech/noun", spelling: "external services" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An external service is no service, since no deploy of akasha puts it up.",
    },
  ],
} as const satisfies Domain
