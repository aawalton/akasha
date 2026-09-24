import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const eso = {
  id: "01a0675b-16ea-77df-9153-bac46e026794",
  type: "page-type/domain",
  slug: "eso",
  definition: "how Alan plays The Elder Scrolls Online",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "eso" }],
  parts: ["domain/eso-wallpaper", "domain/the-elder-scrolls-online"],
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A persona answers for this domain.",
    },
  ],
} as const satisfies Domain
