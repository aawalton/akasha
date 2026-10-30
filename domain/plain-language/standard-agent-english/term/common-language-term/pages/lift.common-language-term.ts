import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const lift = {
  id: "01a18d47-7957-7f9a-bcc5-611900f93979",
  type: "page-type/common-language-term",
  slug: "lift",
  definition: "to raise something off the ground",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "lift" },
    { partOfSpeech: "part-of-speech/verb", spelling: "lifts" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "lifted" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "lifting" },
  ],
  createdAt: "2026-10-30T14:47:14.006Z",
  updatedAt: "2026-10-30T14:47:14.006Z",
} as const satisfies CommonLanguageTerm
