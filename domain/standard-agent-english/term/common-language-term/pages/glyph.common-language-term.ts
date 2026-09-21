import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const glyph = {
  id: "01a0c626-37af-76d2-9410-5222337ec42b",
  type: "page-type/common-language-term",
  slug: "glyph",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "glyph" },
    { partOfSpeech: "part-of-speech/noun", spelling: "glyphs" },
  ],
} as const satisfies CommonLanguageTerm
