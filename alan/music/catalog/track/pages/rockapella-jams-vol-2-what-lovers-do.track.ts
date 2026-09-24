import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2WhatLoversDo = {
  id: "01a0d52b-52de-7974-a7ca-90d82b537aed",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-what-lovers-do",
  ownLength: 3.1779333333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "What Lovers Do",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "whatloversdo|1AFSUleuDTapVhm5zUf4ix|190676",
  song: "song/rockapella-what-lovers-do",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 7,
      externalId: "2YPYjm0jbfmgaKudOt0Pnj",
      externalLink: "https://open.spotify.com/track/2YPYjm0jbfmgaKudOt0Pnj",
    },
  ],
} as const satisfies Track
