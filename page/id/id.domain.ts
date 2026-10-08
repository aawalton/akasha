import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const id = {
  id: "01a05c48-deeb-7011-83b1-73490aa9b3ca",
  type: "page-type/domain",
  slug: "id",
  definition: "how a new id is made",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "id" },
    { partOfSpeech: "part-of-speech/noun", spelling: "ids" },
  ],
  parts: ["module/random-id", "module/uuid-version-7"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the thing an identifier this package makes will name.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-25T17:23:32.000Z",
} as const satisfies Domain
