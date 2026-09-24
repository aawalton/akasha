import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsAHeadFullOfDreams = {
  id: "01a0b9ee-d4fd-7055-bc91-507c097272a0",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-a-head-full-of-dreams",
  ownLength: 3.72955,
  ownProgress: 3.72955,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Head Full of Dreams",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "aheadfullofdreams|4gzpq5DPGxSnKTe4SA8HAU|223773",
  song: "song/coldplay-a-head-full-of-dreams",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 1,
      externalId: "6f49kbOuQSOsStBpyGvQfA",
      externalLink: "https://open.spotify.com/track/6f49kbOuQSOsStBpyGvQfA",
    },
  ],
} as const satisfies Track
