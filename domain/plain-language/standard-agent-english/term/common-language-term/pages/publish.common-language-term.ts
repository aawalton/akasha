import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const publish = {
  id: "01a18d54-2ea1-77e5-b9ec-fa38eb867f9f",
  type: "page-type/common-language-term",
  slug: "publish",
  definition: "to make something available to the public",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "publish" },
    { partOfSpeech: "part-of-speech/verb", spelling: "publishes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "published" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "publishing" },
  ],
  createdAt: "2026-10-30T15:01:06.847Z",
  updatedAt: "2026-10-30T15:01:06.847Z",
} as const satisfies CommonLanguageTerm
