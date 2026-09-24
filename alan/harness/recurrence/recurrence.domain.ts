import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const recurrence = {
  id: "01a05c6f-c7c2-7806-b684-baa6549863dc",
  type: "page-type/domain",
  slug: "recurrence",
  definition: "the days when a thing happens",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "recurrence" }],
  parts: ["module/recurrence-shape", "module/scheduling"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recurrence is stored as an rrule string and read back from the rrule string.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller states the current time.",
    },
  ],
} as const satisfies Domain
