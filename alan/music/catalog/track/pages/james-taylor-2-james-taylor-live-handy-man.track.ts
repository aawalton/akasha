import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveHandyMan = {
  id: "01a0abeb-3c05-72e2-a5f7-085374db7b4e",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-handy-man",
  ownLength: 3.52555,
  ownProgress: 3.52555,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Handy Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "handyman|0vn7UBvSQECKJm2817Yf1P|211533",
  song: "song/james-taylor-handy-man",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 3,
      externalId: "2kuTmskJFZW1L3FMMJFSFp",
      externalLink: "https://open.spotify.com/track/2kuTmskJFZW1L3FMMJFSFp",
    },
  ],
} as const satisfies Track
