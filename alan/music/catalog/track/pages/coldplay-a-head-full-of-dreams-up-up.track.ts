import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsUpUp = {
  id: "01a0b9ee-d688-742d-bf3f-aef55055be3c",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-up-up",
  ownLength: 6.755333333333334,
  ownProgress: 6.755333333333334,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up&Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "upup|4gzpq5DPGxSnKTe4SA8HAU|405320",
  song: "song/coldplay-up-up",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 11,
      externalId: "31L9yLXSj6LpCFupyMV6CR",
      externalLink: "https://open.spotify.com/track/31L9yLXSj6LpCFupyMV6CR",
    },
  ],
} as const satisfies Track
