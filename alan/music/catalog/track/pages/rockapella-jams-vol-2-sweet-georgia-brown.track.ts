import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2SweetGeorgiaBrown = {
  id: "01a0d52b-52de-75e6-8993-7a8fa5492f88",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-sweet-georgia-brown",
  ownLength: 1.1153666666666666,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sweet Georgia Brown",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "sweetgeorgiabrown|1AFSUleuDTapVhm5zUf4ix|66922",
  song: "song/rockapella-sweet-georgia-brown",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 8,
      externalId: "0JeBbmljkszfFbP6bl8rxQ",
      externalLink: "https://open.spotify.com/track/0JeBbmljkszfFbP6bl8rxQ",
    },
  ],
} as const satisfies Track
