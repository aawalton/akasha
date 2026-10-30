import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingEntry = {
  id: "01a06827-ec0c-7c96-bc4a-ca5b59f6b38f",
  type: "page-type/page-type",
  slug: "tracking-entry",
  definition: "a set of values of tracking fields that are written together",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tracking entry" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tracking entries" },
  ],
  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry is an instant or a session or a date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which shape an entry takes is the page type that entry is rather than a value the entry states.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is an entry of this type without standing as one of the three shapes.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:44:01.932Z",
  updatedAt: "2026-10-30T16:49:34.390Z",
} as const satisfies PageType
