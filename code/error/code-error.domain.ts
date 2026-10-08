import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeError = {
  id: "01a0d59a-47de-7a54-b79d-c62342afaf62",
  type: "page-type/domain",
  slug: "code-error",
  definition: "a failure in a program",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "error" },
    { partOfSpeech: "part-of-speech/noun", spelling: "errors" },
  ],
  parts: ["domain/errors-core"],
  createdAt: "2026-09-24T22:47:33.086Z",
  updatedAt: "2026-09-25T14:06:34.000Z",
} as const satisfies Domain
