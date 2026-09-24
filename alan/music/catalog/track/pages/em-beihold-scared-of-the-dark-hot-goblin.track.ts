import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdScaredOfTheDarkHotGoblin = {
  id: "01a0d3ab-b57c-7f9a-999d-6cb275e44a4d",
  type: "page-type/track",
  slug: "em-beihold-scared-of-the-dark-hot-goblin",
  ownLength: 2.6361166666666667,
  ownProgress: 2.6361166666666667,
  partOfCollections: ["release/em-beihold-scared-of-the-dark", "release/em-beihold-hot-goblin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hot Goblin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "hotgoblin|7o2ZQYM7nTsaVdkXY38UAA|158167",
  song: "song/em-beihold-hot-goblin",
  carriedBy: [
    {
      release: "release/em-beihold-hot-goblin",
      discNumber: 1,
      position: 1,
      externalId: "1AQlvpcPh79BKnoKe1E6Nw",
      externalLink: "https://open.spotify.com/track/1AQlvpcPh79BKnoKe1E6Nw",
    },
    {
      release: "release/em-beihold-scared-of-the-dark",
      discNumber: 1,
      position: 2,
      externalId: "2mxi2IQdwga4K5mtBzu2zj",
      externalLink: "https://open.spotify.com/track/2mxi2IQdwga4K5mtBzu2zj",
    },
  ],
} as const satisfies Track
