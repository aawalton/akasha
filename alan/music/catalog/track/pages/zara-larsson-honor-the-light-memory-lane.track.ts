import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightMemoryLane = {
  id: "01a0aa7c-38a0-7243-959a-25a207e61f42",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-memory-lane",
  ownLength: 3.2022166666666667,
  ownProgress: 3.2022166666666667,
  partOfCollections: ["release/zara-larsson-honor-the-light", "release/zara-larsson-memory-lane"],
  status: "completed",
  unit: "unit/minutes",
  title: "Memory Lane",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "memorylane|1Xylc3o4UrD53lo9CvFvVg|192133",
  song: "song/zara-larsson-memory-lane",
  carriedBy: [
    {
      release: "release/zara-larsson-honor-the-light",
      discNumber: 1,
      position: 1,
      externalId: "0oQWZIDgY33kE8kEp6fEne",
      externalLink: "https://open.spotify.com/track/0oQWZIDgY33kE8kEp6fEne",
    },
    {
      release: "release/zara-larsson-memory-lane",
      discNumber: 1,
      position: 1,
      externalId: "624PTd4WB9XanWV1egM2lS",
      externalLink: "https://open.spotify.com/track/624PTd4WB9XanWV1egM2lS",
    },
  ],
} as const satisfies Track
