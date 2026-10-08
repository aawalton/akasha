import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const editor = {
  id: "01a08d6b-4306-7a19-8ee9-a2556ebf0cfa",
  type: "page-type/domain",
  slug: "editor",
  definition: "Alan's code editor",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "editor" }],
  parts: ["domain/extension"],
  createdAt: "2026-09-10T22:23:32.102Z",
  updatedAt: "2026-09-22T13:48:01.000Z",
} as const satisfies Domain
