import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadAWhisper = {
  id: "01a0b9ee-e8ae-7074-a1ba-18ddd147687f",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-a-whisper",
  ownLength: 3.9722166666666667,
  ownProgress: 3.9722166666666667,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Whisper",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "awhisper|4gzpq5DPGxSnKTe4SA8HAU|238333",
  song: "song/coldplay-a-whisper",
  carriedBy: [
    {
      release: "release/coldplay-a-rush-of-blood-to-the-head",
      discNumber: 1,
      position: 9,
      externalId: "7KolrFGhfDi1JTSgQBT5sI",
      externalLink: "https://open.spotify.com/track/7KolrFGhfDi1JTSgQBT5sI",
    },
  ],
} as const satisfies Track
