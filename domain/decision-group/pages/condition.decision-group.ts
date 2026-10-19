import type { DecisionGroup } from "akasha/domain/decision-group/decision-group.page-type.types.ts"

export const condition = {
  id: "01a04e11-9f98-7a6f-b350-aa5c445ac764",
  type: "page-type/decision-group",
  slug: "condition",
  definition: "a state that holds only while it is kept true",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "condition" },
    { partOfSpeech: "part-of-speech/noun", spelling: "conditions" },
  ],
  createdAt: "2026-08-29T15:09:32.952Z",
  updatedAt: "2026-10-19T19:45:39.765Z",
} as const satisfies DecisionGroup
