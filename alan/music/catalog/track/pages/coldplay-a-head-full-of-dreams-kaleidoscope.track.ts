import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsKaleidoscope = {
  id: "01a0b9ee-d5e7-7676-979e-ba06a0c280ae",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-kaleidoscope",
  ownLength: 1.8642166666666666,
  ownProgress: 1.8642166666666666,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Kaleidoscope",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "kaleidoscope|4gzpq5DPGxSnKTe4SA8HAU|111853",
  song: "song/coldplay-kaleidoscope",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 7,
      externalId: "7IX7VAXujvcZ3e1PG7sGP7",
      externalLink: "https://open.spotify.com/track/7IX7VAXujvcZ3e1PG7sGP7",
    },
  ],
} as const satisfies Track
