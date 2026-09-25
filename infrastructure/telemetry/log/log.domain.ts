import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const log = {
  id: "01a0658b-0f02-79a4-861b-f04b48ab54ce",
  type: "page-type/domain",
  slug: "log",
  definition: "the text a program writes about what that program is doing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "log" },
    { partOfSpeech: "part-of-speech/noun", spelling: "logs" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A log is kept for days.",
    },
  ],
} as const satisfies Domain
