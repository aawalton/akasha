import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const nativeShell = {
  id: "01a18d8a-6b69-755a-a92e-da383d804954",
  type: "page-type/domain",
  slug: "native-shell",
  definition: "the code of an app for Alan's phone",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "native shell" },
    { partOfSpeech: "part-of-speech/noun", spelling: "native shells" },
  ],
  createdAt: "2026-10-30T16:00:21.352Z",
  updatedAt: "2026-10-30T16:00:21.352Z",
} as const satisfies Domain
