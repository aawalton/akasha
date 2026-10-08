import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const release = {
  id: "01a06769-ed1a-7000-825b-b75cf6badf16",
  type: "page-type/page-type",
  slug: "release",
  definition: "an album Alan keeps",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "release" },
    { partOfSpeech: "part-of-speech/noun", spelling: "releases" },
  ],
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A release has the songs put out together under one title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release names the artist the release is part of.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T13:16:30.362Z",
  updatedAt: "2026-09-22T00:11:08.000Z",
} as const satisfies PageType
