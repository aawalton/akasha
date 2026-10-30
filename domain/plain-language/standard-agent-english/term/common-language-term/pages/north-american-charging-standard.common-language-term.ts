import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const northAmericanChargingStandard = {
  id: "01a18d76-9525-754e-89fc-b91c24646f82",
  type: "page-type/common-language-term",
  slug: "north-american-charging-standard",
  definition:
    "the plug and port Tesla made that most electric cars in North America now charge through",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "North American Charging Standard" },
  ],
  createdAt: "2026-10-30T15:38:41.316Z",
  updatedAt: "2026-10-30T15:53:41.615Z",
} as const satisfies CommonLanguageTerm
