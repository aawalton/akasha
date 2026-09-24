import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const notification = {
  id: "01a0d586-60b9-709d-905d-7fe8014abf0c",
  type: "page-type/domain",
  slug: "notification",
  definition: "a message a device shows",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "notification" },
    { partOfSpeech: "part-of-speech/noun", spelling: "notifications" },
  ],
} as const satisfies Domain
