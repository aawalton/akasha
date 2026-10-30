import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sharedAlbum = {
  id: "01a18d85-5479-7627-9d99-db932ea87275",
  type: "page-type/common-language-term",
  slug: "shared-album",
  definition: "an iCloud album that other people open by a link",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "shared album" },
    { partOfSpeech: "part-of-speech/noun", spelling: "shared albums" },
  ],
  createdAt: "2026-10-30T15:54:47.799Z",
  updatedAt: "2026-10-30T15:54:47.799Z",
} as const satisfies CommonLanguageTerm
