import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const download = {
  id: "01a18d68-e08b-708d-a49e-df71cc14a0d9",
  type: "page-type/common-language-term",
  slug: "download",
  definition: "to copy a file from another computer",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "download" },
    { partOfSpeech: "part-of-speech/verb", spelling: "downloads" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "downloaded" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "downloading" },
  ],
  createdAt: "2026-10-30T15:23:43.114Z",
  updatedAt: "2026-10-30T15:23:43.114Z",
} as const satisfies CommonLanguageTerm
