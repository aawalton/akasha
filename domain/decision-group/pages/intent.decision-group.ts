import type { DecisionGroup } from "akasha/domain/decision-group/decision-group.page-type.types.ts"

export const intent = {
  id: "01a04e11-9f98-71e8-b821-77545c6be68e",
  type: "page-type/decision-group",
  slug: "intent",
  definition: "a decision that does not hold yet",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "intent" },
    { partOfSpeech: "part-of-speech/noun", spelling: "intents" },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Resolve When Found",
      act: "Move or delete an intent entry as soon as you find it true, not when the work on it closes.",
      warrant:
        "Nothing re-reads an entry, so one that came true and stayed sends someone at a gap already shut.",
      aids: [
        "Check the whole claim, not just the case you met.",
        "Resolve the entry you found, not the section.",
      ],
    },
  ],
  createdAt: "2026-08-29T15:09:32.952Z",
  updatedAt: "2026-10-30T15:42:34.269Z",
} as const satisfies DecisionGroup
