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
  createdAt: "2026-09-01T10:00:39.792Z",
  updatedAt: "2026-09-25T17:23:39.000Z",
} as const satisfies Domain
