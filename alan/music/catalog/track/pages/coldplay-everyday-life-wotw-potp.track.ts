import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeWotwPotp = {
  id: "01a0b9ee-cfa7-7bca-9148-50a545e06348",
  type: "page-type/track",
  slug: "coldplay-everyday-life-wotw-potp",
  ownLength: 1.2822166666666666,
  ownProgress: 1.2822166666666666,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "WOTW / POTP",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "wotwpotp|4gzpq5DPGxSnKTe4SA8HAU|76933",
  song: "song/coldplay-wotw-potp",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 6,
      externalId: "7jib2tJjQ82kTIZZATMvAK",
      externalLink: "https://open.spotify.com/track/7jib2tJjQ82kTIZZATMvAK",
    },
  ],
} as const satisfies Track
