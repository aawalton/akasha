import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const playlist = {
  id: "01a0c510-ec49-748c-b793-6c6629cc118b",
  type: "page-type/page-type",
  slug: "playlist",
  definition: "a list of tracks Spotify holds for Alan",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "playlist" }],
  extends: ["page-type/collection-external"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is the record of a playlist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A playlist akasha keeps up to date is a page here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page here states the tracks its playlist holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracks a playlist holds are read from Spotify at the moment they are wanted.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
