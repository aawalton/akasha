import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const prompt = {
  id: "01a16427-f76c-7b6e-869a-860897361a6b",
  type: "page-type/common-language-term",
  slug: "prompt",
  definition: "a message that starts the work of an agent",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "prompt" },
    { partOfSpeech: "part-of-speech/noun", spelling: "prompts" },
  ],
  createdAt: "2026-10-22T15:08:23.276Z",
  updatedAt: "2026-10-22T15:08:23.276Z",
} as const satisfies CommonLanguageTerm
