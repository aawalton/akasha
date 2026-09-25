import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const identity = {
  id: "01a05c69-e870-7637-b745-5f768a4c4a67",
  type: "page-type/domain",
  slug: "identity",
  definition: "the name of a page in a file",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "identity" },
    { partOfSpeech: "part-of-speech/noun", spelling: "identities" },
  ],
  parts: ["module/file-page", "module/sha1-digest"],
} as const satisfies Domain
