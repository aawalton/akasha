import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeError = {
  id: "01a0d59a-47de-7a54-b79d-c62342afaf62",
  type: "page-type/domain",
  slug: "code-error",
  definition: "a fault in a running program",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "error" },
    { partOfSpeech: "part-of-speech/noun", spelling: "errors" },
  ],
} as const satisfies Domain
