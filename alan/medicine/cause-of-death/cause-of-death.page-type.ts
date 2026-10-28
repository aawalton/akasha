import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const causeOfDeath = {
  id: "01a183bc-e758-7df8-8861-f179dcfa60a1",
  type: "page-type/page-type",
  slug: "cause-of-death",
  definition: "a cause of death the health model weighs for Alan",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "cause of death" },
    { partOfSpeech: "part-of-speech/noun", spelling: "causes of death" },
  ],
  extends: ["page-type/page"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T18:19:17.719Z",
  updatedAt: "2026-10-28T18:19:17.719Z",
} as const satisfies PageType
