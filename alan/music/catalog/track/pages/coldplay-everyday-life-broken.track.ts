import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeBroken = {
  id: "01a0b9ee-cf51-74ae-b5fe-8a69f406292c",
  type: "page-type/track",
  slug: "coldplay-everyday-life-broken",
  ownLength: 2.5033333333333334,
  ownProgress: 2.5033333333333334,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "BrokEn",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "broken|4gzpq5DPGxSnKTe4SA8HAU|150200",
  song: "song/coldplay-broken",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 4,
      externalId: "1cXXhzPnbrXjNQYbLdUJdy",
      externalLink: "https://open.spotify.com/track/1cXXhzPnbrXjNQYbLdUJdy",
    },
  ],
} as const satisfies Track
