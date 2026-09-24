import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsEverglow = {
  id: "01a0b9ee-d572-76b8-a529-a731d0fb6e8f",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-everglow",
  ownLength: 4.71155,
  ownProgress: 4.71155,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everglow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "everglow|4gzpq5DPGxSnKTe4SA8HAU|282693",
  song: "song/coldplay-everglow",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 4,
      externalId: "5qfZRNjt2TkHEL12r3sDEU",
      externalLink: "https://open.spotify.com/track/5qfZRNjt2TkHEL12r3sDEU",
    },
  ],
} as const satisfies Track
