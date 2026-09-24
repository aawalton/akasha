import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const service = {
  id: "01a0d4c3-0f0b-71b5-b96d-437a3498aa88",
  type: "page-type/domain",
  slug: "service",
  definition: "a program another program calls",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "service" },
    { partOfSpeech: "part-of-speech/noun", spelling: "services" },
  ],
  parts: ["page-type/akasha-service", "domain/external-service"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is an akasha service or an external service.",
    },
  ],
} as const satisfies Domain
