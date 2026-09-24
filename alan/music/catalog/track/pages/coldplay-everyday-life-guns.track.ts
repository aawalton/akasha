import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeGuns = {
  id: "01a0b9ee-d013-75bd-b68b-3a921e85e5fb",
  type: "page-type/track",
  slug: "coldplay-everyday-life-guns",
  ownLength: 1.918,
  ownProgress: 1.918,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Guns",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "guns|4gzpq5DPGxSnKTe4SA8HAU|115080",
  song: "song/coldplay-guns",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 1,
      externalId: "6VzRvCbolqcUswaSPm48rI",
      externalLink: "https://open.spotify.com/track/6VzRvCbolqcUswaSPm48rI",
    },
  ],
} as const satisfies Track
