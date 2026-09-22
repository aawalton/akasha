import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const editor = {
  id: "01a08d6b-4306-7a19-8ee9-a2556ebf0cfa",
  type: "page-type/domain",
  slug: "editor",
  definition: "the editor Alan writes code in",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "editor" }],
  parts: ["domain/extension"],
} as const satisfies Domain
