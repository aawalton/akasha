import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeTroubleInTown = {
  id: "01a0b9ee-cf2a-766e-aefc-a761ae2d5df6",
  type: "page-type/track",
  slug: "coldplay-everyday-life-trouble-in-town",
  ownLength: 4.648433333333333,
  ownProgress: 4.648433333333333,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Trouble In Town",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "troubleintown|4gzpq5DPGxSnKTe4SA8HAU|278906",
  song: "song/coldplay-trouble-in-town",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 3,
      externalId: "45PqOIkZ9PdCjsCJQYzx9G",
      externalLink: "https://open.spotify.com/track/45PqOIkZ9PdCjsCJQYzx9G",
    },
  ],
  createdAt: "2026-09-19T13:50:30.698Z",
  updatedAt: "2026-09-24T19:58:53.000Z",
} as const satisfies Track
