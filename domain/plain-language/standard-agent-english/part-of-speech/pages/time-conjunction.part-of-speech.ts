import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const timeConjunction = {
  id: "01a15545-f559-77d9-9643-d807e61f60d0",
  type: "page-type/part-of-speech",
  slug: "time-conjunction",
  definition: "a word putting a whole clause saying when under another phrase",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "time conjunction" },
    { partOfSpeech: "part-of-speech/noun", spelling: "time conjunctions" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word here fills no slot in the clause it opens, so the clause is whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause a word here opens says when, and is never a noun phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause saying what rather than when is opened by a subordinating conjunction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a word here opens a clause saying when, so a preposition opens no clause.",
    },
  ],
  createdAt: "2026-10-19T17:46:50.583Z",
  updatedAt: "2026-10-19T17:46:50.583Z",
} as const satisfies PartOfSpeech
