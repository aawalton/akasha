import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldTitle = {
  id: "01a06558-a991-7a45-b681-fed7723c95e3",
  type: "page-type/page-type",
  slug: "world-title",
  definition: "a name the world gives a character for something the character does",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "world title" },
    { partOfSpeech: "part-of-speech/noun", spelling: "world titles" },
  ],
  pluralSlug: "titles",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  parts: ["page-type/character-title"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-10-30T16:09:26.558Z",
} as const satisfies PageType
