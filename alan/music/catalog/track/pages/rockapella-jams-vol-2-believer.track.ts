import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2Believer = {
  id: "01a0d52b-52de-713b-971e-de262a84b2af",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-believer",
  ownLength: 1.3543,
  ownProgress: 1.3543,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Believer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "believer|1AFSUleuDTapVhm5zUf4ix|81258",
  song: "song/rockapella-believer",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 5,
      externalId: "5ZxsohvKqdpT1TXg7e2l1b",
      externalLink: "https://open.spotify.com/track/5ZxsohvKqdpT1TXg7e2l1b",
    },
  ],
} as const satisfies Track
